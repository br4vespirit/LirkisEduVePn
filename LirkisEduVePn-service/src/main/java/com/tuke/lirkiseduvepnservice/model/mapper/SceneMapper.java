package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.Scene;
import com.tuke.lirkiseduvepnservice.model.dao.ScenePhoto;
import com.tuke.lirkiseduvepnservice.model.dto.ScenePreviewResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class SceneMapper {

    @Mapping(target = "photos", source = "scenePhotos", qualifiedByName = "mapPhotos")
    public abstract ScenePreviewResponse daoToScenePreview(Scene scene);

    @Named("mapPhotos")
    protected List<byte[]> mapPhotos(List<ScenePhoto> scenePhotos) {
        return scenePhotos
                .stream()
                .map(ScenePhoto::getPhoto)
                .toList();
    }
}
