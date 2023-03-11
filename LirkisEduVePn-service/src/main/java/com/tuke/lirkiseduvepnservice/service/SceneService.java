package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.exception.*;
import com.tuke.lirkiseduvepnservice.model.SceneFileExtension;
import com.tuke.lirkiseduvepnservice.model.dao.Scene;
import com.tuke.lirkiseduvepnservice.model.dao.SceneFile;
import com.tuke.lirkiseduvepnservice.model.dao.ScenePhoto;
import com.tuke.lirkiseduvepnservice.model.dto.ScenePreviewResponse;
import com.tuke.lirkiseduvepnservice.model.dto.SceneRequest;
import com.tuke.lirkiseduvepnservice.model.mapper.SceneMapper;
import com.tuke.lirkiseduvepnservice.repository.SceneRepository;
import com.tuke.lirkiseduvepnservice.utils.ImageResizer;
import com.tuke.lirkiseduvepnservice.utils.PhotoExtractor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class SceneService {

    private final PhotoExtractor photoExtractor;
    private final SceneRepository sceneRepository;
    private final SceneMapper sceneMapper;
    private final ImageResizer imageResizer;

    @Transactional
    public void saveScene(SceneRequest request) {
        MultipartFile file = request.getFile();

        try (ZipInputStream zipInputStream = new ZipInputStream(file.getInputStream())) {
            ZipEntry entry;

            Scene scene = new Scene();
            scene.setName(request.getName());
            scene.setDescription(request.getDescription());

            List<SceneFile> sceneFiles = new ArrayList<>();
            List<ScenePhoto> scenePhotos = new ArrayList<>();

            Set<String> parsedExtensions = new HashSet<>(List.of("HTML", "TS", "SPEC_TS"));

            while ((entry = zipInputStream.getNextEntry()) != null) {
                String filename = entry.getName();
                byte[] content = zipInputStream.readAllBytes();

                if (filename.startsWith("photo/")) {
                    if (entry.isDirectory() && !filename.equals("photo/")) {
                        throw new UnknownDirectoryException("An unknown directory other than \"photo/\" was found in the zip file");
                    } else if (!entry.isDirectory()) {
                        boolean validated = photoExtractor.validatePhotoFile(filename);
                        if (validated) {
                            ScenePhoto scenePhoto = new ScenePhoto(content);
                            scenePhotos.add(scenePhoto);
                        }
                    }
                } else if (entry.isDirectory()) {
                    throw new UnknownDirectoryException("An unknown directory other than \"photo/\" was found in the zip file");
                } else {
                    SceneFile sceneFile = parseSceneFile(filename, content);
                    if (!parsedExtensions.contains(sceneFile.getFileExtension().name())) {
                        throw new RecurringFileExtensionException("File extension is recurring");
                    }
                    parsedExtensions.remove(sceneFile.getFileExtension().name());
                    sceneFiles.add(sceneFile);
                }
            }
            if (!parsedExtensions.isEmpty()) {
                throw new EnoughSceneFilesException("Enough scene files were provided in zip file");
            }

            for (ScenePhoto p : scenePhotos) {
                p.setScene(scene);
            }
            for (SceneFile f : sceneFiles) {
                f.setScene(scene);
            }
            scene.setSceneFiles(sceneFiles);
            scene.setScenePhotos(scenePhotos);
            sceneRepository.save(scene);
        } catch (IOException e) {
            log.error("An unknown error occurred while parsing .zip file");
        }
    }

    private SceneFile parseSceneFile(String filename, byte[] content) {
        SceneFile sceneFile;
        SceneFileExtension fileExtension = null;
        if (filename.endsWith("component.ts")) {
            fileExtension = SceneFileExtension.TS;
        } else if (filename.endsWith("component.spec.ts")) {
            fileExtension = SceneFileExtension.SPEC_TS;
        } else if (filename.endsWith("component.html")) {
            fileExtension = SceneFileExtension.HTML;
        }
        if (fileExtension == null) {
            throw new UnknownFileException("An unknown file other than \".ts\", \".html\" or \".spec.ts\" was found in the zip file");
        }
        filename = filename.substring(0, filename.length() - fileExtension.name().length() - 11);
        if (filename.contains(".")) {
            throw new IncorrectFileExtensionException("Unknown file exception was provided in root directory");
        }
        sceneFile = new SceneFile();
        sceneFile.setFile(content);
        sceneFile.setFileExtension(fileExtension);
        return sceneFile;
    }

    public List<ScenePreviewResponse> findAll() {
        List<ScenePreviewResponse> response = sceneRepository.findAll()
                .stream()
                .map(sceneMapper::daoToScenePreview)
                .toList();
        try {
            resizeImages(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return response;
    }

    private void resizeImages(List<ScenePreviewResponse> scenes) {
        for (ScenePreviewResponse response : scenes) {
            List<byte[]> resizedPhotos = imageResizer.resizeImages(response.getPhotos());
            response.setPhotos(resizedPhotos);
        }
    }
}
