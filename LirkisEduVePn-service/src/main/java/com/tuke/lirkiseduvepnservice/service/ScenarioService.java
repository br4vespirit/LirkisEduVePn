package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.exception.*;
import com.tuke.lirkiseduvepnservice.model.LanguageExtension;
import com.tuke.lirkiseduvepnservice.model.dao.LanguageFile;
import com.tuke.lirkiseduvepnservice.model.dao.Scenario;
import com.tuke.lirkiseduvepnservice.model.dao.ScenarioPhoto;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioPreviewResponse;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioRequest;
import com.tuke.lirkiseduvepnservice.model.mapper.ScenarioMapper;
import com.tuke.lirkiseduvepnservice.repository.ScenarioRepository;
import com.tuke.lirkiseduvepnservice.utils.ImageResizer;
import com.tuke.lirkiseduvepnservice.utils.PhotoExtractor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * ScenarioService class contains methods to manage scenarios
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ScenarioService {

    /**
     * Repository for working with the "scenario" table in the database
     */
    private final ScenarioRepository scenarioRepository;

    /**
     * Mapper to map all Scenario data transfer objects and Scenario entity between each other
     */
    private final ScenarioMapper scenarioMapper;

    /**
     * ImageResizer class to resize images
     */
    private final ImageResizer imageResizer;

    /**
     * The PhotoExtractor class contains methods for validating and extracting photo files based on their file extensions.
     */
    private final PhotoExtractor photoExtractor;

    /**
     * Creates a new scenario. An object (request) containing a zip file will be received,
     * from which all the necessary files for the scenario will be extracted
     *
     * @param request object that contains all necessary data about scenario to create
     */
    @Transactional
    public void saveScenario(ScenarioRequest request) {
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
                        boolean validated = photoExtractor.validatePhotoFile(filename);
                        if (validated) {
                            ScenarioPhoto scenarioPhoto = new ScenarioPhoto(content);
                            scenarioPhotoList.add(scenarioPhoto);
                        }
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
                } else if (filename.endsWith(".cpn")) {
                    scenario.setFile(content);
                } else {
                    throw new UnknownFileException("An unknown file other than \".pnml\" was found in the zip file");
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

    /**
     * The method handles the file in the LanguageFile entity. The file must necessarily consist of two extensions:
     * the file language in the form of ISO 3166-1, and at the end of the format must be json
     *
     * @param filename name of the file
     * @param content  file content
     * @return LanguageFile entity of hte parsed file
     */
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

    /**
     * The findLanguage method is used to find a LanguageExtension based on the provided language name.
     *
     * @param lang A String representing the name of the language to find.
     * @return The LanguageExtension matching the provided name, or null if no match is
     */
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

    /**
     * The findAll method retrieves a List of all scenarios from the scenarioRepository and maps them
     * to a List of ScenarioPreviewResponse objects using the scenarioMapper. It then calls the private
     * resizeImages method to resize the photos in each ScenarioPreviewResponse object.
     *
     * @return A List of ScenarioPreviewResponse objects representing all scenarios in the scenarioRepository, with their photos resized.
     */
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

    /**
     * The resizeImages method takes a List of ScenarioPreviewResponse objects and resizes the
     * photos in each object using the ImageResizer service.
     *
     * @param scenarios A List of ScenarioPreviewResponse objects to resize the photos of.
     */
    private void resizeImages(List<ScenarioPreviewResponse> scenarios) {
        for (ScenarioPreviewResponse response : scenarios) {
            List<byte[]> resizedPhotos = imageResizer.resizeImages(response.getPhotos());
            response.setPhotos(resizedPhotos);
        }
    }
}