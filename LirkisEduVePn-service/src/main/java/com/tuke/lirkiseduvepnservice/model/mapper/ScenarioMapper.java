package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.LanguageFile;
import com.tuke.lirkiseduvepnservice.model.dao.Scenario;
import com.tuke.lirkiseduvepnservice.model.dao.ScenarioPhoto;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioPreviewResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

/**
 * The ScenarioMapper is used to map Scenario entity and related DTO objects between each other
 * It contains several mapping methods that are used by the Spring Framework to automatically map objects based
 * on their names.
 */
@Mapper(componentModel = "spring")
public abstract class ScenarioMapper {

    /**
     * Maps a Scenario entity to a ScenarioPreviewResponse object
     *
     * @param scenario The Scenario entity to map to a ScenarioPreviewResponse object.
     * @return A ScenarioPreviewResponse object representing the provided Scenario entity
     */
    @Mapping(target = "languages", source = "languageFiles", qualifiedByName = "mapLanguages")
    @Mapping(target = "photos", source = "scenarioPhotos", qualifiedByName = "mapPhotos")
    public abstract ScenarioPreviewResponse daoToScenarioPreview(Scenario scenario);

    /**
     * Method to map Scenario languageFiles field to ScenarioPreviewResponse languages field
     *
     * @param languageFiles Scenario entity languageFiles field
     * @return ScenarioPreviewResponse object languages field
     */
    @Named("mapLanguages")
    protected List<String> mapLanguages(List<LanguageFile> languageFiles) {
        return languageFiles
                .stream()
                .map(languageFile -> languageFile.getExtension().name())
                .toList();
    }

    /**
     * Method to map Scenario scenarioPhotos field to ScenarioPreviewResponse photos field
     *
     * @param scenarioPhotos Scenario entity scenarioPhotos field
     * @return ScenarioPreviewResponse object photos field
     */
    @Named("mapPhotos")
    protected List<byte[]> mapPhotos(List<ScenarioPhoto> scenarioPhotos) {
        return scenarioPhotos
                .stream()
                .map(ScenarioPhoto::getPhoto)
                .toList();
    }
}
