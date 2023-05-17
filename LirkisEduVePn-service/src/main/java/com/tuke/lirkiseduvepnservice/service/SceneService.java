package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.exception.IncorrectFileExtensionException;
import com.tuke.lirkiseduvepnservice.model.dao.Scene;
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
import java.util.List;

/**
 * SceneService class contains methods to manage scenes
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class SceneService {

    /**
     * PhotoExtractor class for extraction photos
     */
    private final PhotoExtractor photoExtractor;

    /**
     * Repository for working with the "scene" table in the database
     */
    private final SceneRepository sceneRepository;

    /**
     * Mapper to map all Scene data transfer objects and Scene entity between each other
     */
    private final SceneMapper sceneMapper;

    /**
     * ImageResizer class to resize images
     */
    private final ImageResizer imageResizer;

    /**
     * Registers a scene in the database
     *
     * @param request object that contains all necessary data about scene to register
     */
    @Transactional
    public void saveScene(SceneRequest request) {
        MultipartFile file = request.getFile();

        Scene scene = new Scene();
        scene.setName(request.getName());
        scene.setDescription(request.getDescription());
        scene.setFolderName(request.getFolder());

        if (!photoExtractor.validatePhotoFile(file.getOriginalFilename())) {
            throw new IncorrectFileExtensionException("Unknown photo extension was provided");
        }
        try {
            scene.setPhoto(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        sceneRepository.save(scene);
    }

    /**
     * Returns all registered scene in the database
     *
     * @return list of ScenePreviewResponse objects
     */
    public List<ScenePreviewResponse> findAll() {
        List<ScenePreviewResponse> response = sceneRepository.findAll()
                .stream()
                .map(sceneMapper::daoToScenePreview)
                .toList();
        try {
            resizeImage(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return response;
    }

    /**
     * Resizes photo of each provided scene in a list
     *
     * @param scenes list of scenes
     */
    private void resizeImage(List<ScenePreviewResponse> scenes) {
        for (ScenePreviewResponse response : scenes) {
            byte[] resizedPhotos = null;
            try {
                resizedPhotos = imageResizer.resizeImage(response.getPhoto(), 500, 300);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            response.setPhoto(resizedPhotos);
        }
    }
}
