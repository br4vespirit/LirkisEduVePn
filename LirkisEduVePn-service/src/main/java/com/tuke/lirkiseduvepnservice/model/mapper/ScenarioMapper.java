package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.LanguageFile;
import com.tuke.lirkiseduvepnservice.model.dao.Scenario;
import com.tuke.lirkiseduvepnservice.model.dao.ScenarioPhoto;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioPreviewResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ScenarioMapper {

    @Mapping(target = "languages", source = "languageFiles", qualifiedByName = "mapLanguages")
    @Mapping(target = "photos", source = "scenarioPhotos", qualifiedByName = "mapPhotos")
    public abstract ScenarioPreviewResponse daoToScenarioPreview(Scenario scenario);

    @Named("mapLanguages")
    protected List<String> mapLanguages(List<LanguageFile> languageFiles) {
        return languageFiles
                .stream()
                .map(languageFile -> languageFile.getExtension().name())
                .toList();
    }

    @Named("mapPhotos")
    protected List<byte[]> mapPhotos(List<ScenarioPhoto> scenarioPhotos) {
        return scenarioPhotos
                .stream()
                .map(ScenarioPhoto::getPhoto)
                .toList();
    }
}
