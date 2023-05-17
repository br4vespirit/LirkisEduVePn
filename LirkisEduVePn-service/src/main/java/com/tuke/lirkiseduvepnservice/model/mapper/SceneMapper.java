package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.Scene;
import com.tuke.lirkiseduvepnservice.model.dto.ScenePreviewResponse;
import org.mapstruct.Mapper;

/**
 * The SceneMapper is used to map Scene entity and related DTO objects between each other
 * It contains several mapping methods that are used by the Spring Framework to automatically map objects based
 * on their names.
 */
@Mapper(componentModel = "spring")
public abstract class SceneMapper {

    public abstract ScenePreviewResponse daoToScenePreview(Scene scene);
}
