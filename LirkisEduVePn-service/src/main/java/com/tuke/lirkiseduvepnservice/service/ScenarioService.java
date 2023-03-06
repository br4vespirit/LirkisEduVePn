package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.exception.*;
import com.tuke.lirkiseduvepnservice.model.LanguageExtension;
import com.tuke.lirkiseduvepnservice.model.dao.LanguageFile;
import com.tuke.lirkiseduvepnservice.model.dao.Scenario;
import com.tuke.lirkiseduvepnservice.model.dao.ScenarioPhoto;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioPreviewResponse;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioRequestDto;
import com.tuke.lirkiseduvepnservice.model.mapper.ScenarioMapper;
import com.tuke.lirkiseduvepnservice.repository.ScenarioRepository;
import com.tuke.lirkiseduvepnservice.utils.ImageResizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScenarioService {

    private static final Set<String> PHOTO_EXTENSIONS = new HashSet<>(Arrays.asList(".png", ".jpg", ".jpeg", ".webp"));
    private final ScenarioRepository scenarioRepository;
    private final ScenarioMapper scenarioMapper;
    private final ImageResizer imageResizer;

    @Transactional
    public void saveScenario(ScenarioRequestDto request) throws
            UnknownDirectoryException,
            UnknownFileException,
            InstanceNotFoundException,
            IncorrectFileExtensionException,
            IncorrectLanguageExtensionException {
        MultipartFile file = request.getFile();

        try (ZipInputStream zipInputStream = new ZipInputStream(file.getInputStream())) {
            ZipEntry entry;

            Scenario scenario = new Scenario();
            scenario.setName(request.getName());
            scenario.setDescription(request.getDescription());

            List<LanguageFile> languageFileList = new ArrayList<>();
            List<ScenarioPhoto> scenarioPhotoList = new ArrayList<>();

            while ((entry = zipInputStream.getNextEntry()) != null) {
                String filename = entry.getName();
                byte[] content = zipInputStream.readAllBytes();

                if (filename.startsWith("photo/")) {
                    if (entry.isDirectory() && !filename.equals("photo/")) {
                        throw new UnknownDirectoryException("An unknown directory other than \"photo/\" was found in the zip file");
                    } else if (!entry.isDirectory()) {
                        ScenarioPhoto scenarioPhoto = parseScenarioPhotos(filename, content);
                        scenarioPhotoList.add(scenarioPhoto);
                    }
                } else if (filename.startsWith("lang/")) {
                    if (entry.isDirectory() && !filename.equals("lang/")) {
                        throw new UnknownDirectoryException("An unknown directory other than \"lang/\" was found in the zip file");
                    } else if (!entry.isDirectory()) {
                        LanguageFile languageFile = parseLanguageFile(filename, content);
                        if (languageFile != null) {
                            languageFileList.add(languageFile);
                        }
                    }
                } else if (entry.isDirectory()) {
                    throw new UnknownDirectoryException("An unknown directory other than \"lang/\" was found in the zip file");
                } else if (filename.endsWith(".pnml")) {
                    scenario.setFile(content);
                } else {
                    throw new UnknownFileException("An unknown directory other than \".pnml\" was found in the zip file");
                }
            }

            if (languageFileList.isEmpty()) {
                throw new InstanceNotFoundException("No \"lang/\" directory was found");
            }
            if (scenario.getFile() == null) {
                throw new InstanceNotFoundException("No file with .pnml extension was found");
            }

            for (LanguageFile f : languageFileList) {
                f.setScenario(scenario);
            }
            for (ScenarioPhoto s : scenarioPhotoList) {
                s.setScenario(scenario);
            }
            scenario.setLanguageFiles(languageFileList);
            scenario.setScenarioPhotos(scenarioPhotoList);
            scenarioRepository.save(scenario);
        } catch (IOException e) {
            log.error("An unknown error occurred while parsing .zip file");
        }
    }

    private LanguageFile parseLanguageFile(String filename, byte[] content) {
        LanguageFile languageFile;
        if (filename.length() < 9 || !filename.endsWith(".json")) {
            throw new IncorrectFileExtensionException("Provided file inside \"lang/\" directory has other than .json extension");
        }
        filename = filename.substring(0, filename.length() - 5);
        String extension = filename.substring(filename.length() - 3);
        if (extension.charAt(0) != '.') {
            throw new IncorrectLanguageExtensionException("Provided file inside \"lang/\" directory has other than .**.json extension");
        }
        String language = filename.substring(filename.length() - 2).toUpperCase();
        LanguageExtension ext = findLanguage(language);
        if (ext == null) {
            log.warn("Provided file inside \"lang/\" directory with unknown language extension: " + language);
            return null;
        }
        languageFile = new LanguageFile();
        languageFile.setFile(content);
        languageFile.setExtension(ext);
        return languageFile;
    }

    private LanguageExtension findLanguage(String lang) {
        LanguageExtension extension = null;
        for (LanguageExtension value : LanguageExtension.values()) {
            if (value.name().equals(lang)) {
                extension = value;
                break;
            }
        }
        return extension;
    }


    private ScenarioPhoto parseScenarioPhotos(String filename, byte[] content) {
        ScenarioPhoto scenarioPhoto;
        final String photoExtension = getFileExtension(filename);
        if (!PHOTO_EXTENSIONS.contains(photoExtension)) {
            throw new IncorrectFileExtensionException("Provided file inside \"photo/\" directory has other than .png, .jpg, .jpeg or .webp extension");
        }
        filename = filename.substring(0, filename.length() - photoExtension.length());
        if (filename.contains(".")) {
            throw new IncorrectFileExtensionException("Provided file inside \"photo/\" directory has an unauthorized extension");
        }
        scenarioPhoto = new ScenarioPhoto();
        scenarioPhoto.setPhoto(content);
        return scenarioPhoto;
    }

    private String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex);
    }

    public List<ScenarioPreviewResponse> findAll() {
        List<ScenarioPreviewResponse> response = scenarioRepository.findAll()
                .stream()
                .map(scenarioMapper::daoToScenarioPreview)
                .toList();
        try {
            resizeImages(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return response;
    }

    private void resizeImages(List<ScenarioPreviewResponse> scenarios) throws Exception {
        for (ScenarioPreviewResponse response : scenarios) {
            List<byte[]> photos = response.getPhotos();
            List<byte[]> resizedPhotos = new ArrayList<>();
            for (byte[] photo : photos) {
                resizedPhotos.add(imageResizer.resizeImage(photo, 500, 300));
            }
            response.setPhotos(resizedPhotos);
        }
    }
}