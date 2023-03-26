package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.Scene;
import com.tuke.lirkiseduvepnservice.model.dto.ScenePreviewResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class SceneMapper {

    public abstract ScenePreviewResponse daoToScenePreview(Scene scene);
}
