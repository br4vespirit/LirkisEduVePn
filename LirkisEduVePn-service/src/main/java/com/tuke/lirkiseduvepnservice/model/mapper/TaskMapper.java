package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.Scenario;
import com.tuke.lirkiseduvepnservice.model.dao.Scene;
import com.tuke.lirkiseduvepnservice.model.dao.Task;
import com.tuke.lirkiseduvepnservice.model.dao.TaskSession;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioPreviewResponse;
import com.tuke.lirkiseduvepnservice.model.dto.ScenePreviewResponse;
import com.tuke.lirkiseduvepnservice.model.dto.TasksPreview;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;

/**
 * The TaskMapper is used to map Task entity and related DTO objects between each other
 * It contains several mapping methods that are used by the Spring Framework to automatically map objects based
 * on their names.
 */
@Mapper(componentModel = "spring")
public abstract class TaskMapper {

    /**
     * Maps a Task entity to a TasksPreview object
     *
     * @param task The Task entity to map to a TasksPreview object.
     * @return A TasksPreview object representing the provided Task entity
     */
    @Mapping(target = "scenario", source = "scenario", qualifiedByName = "mapScenario")
    @Mapping(target = "scene", source = "scene", qualifiedByName = "mapScene")
    @Mapping(target = "openSessions", source = "taskSessions", qualifiedByName = "mapSessions")
    public abstract TasksPreview daoToTaskPreview(Task task);

    /**
     * Method to map Task scenario field to TaskPreview scenario field
     *
     * @param scenario Task entity scenario field
     * @return TaskPreview object scenario field
     */
    @Named("mapScenario")
    protected ScenarioPreviewResponse mapScenario(Scenario scenario) {
        ScenarioMapper scenarioMapper = Mappers.getMapper(ScenarioMapper.class);
        return scenarioMapper.daoToScenarioPreview(scenario);
    }

    /**
     * Method to map Task scene field to TaskPreview scene field
     *
     * @param scene Task entity scene field
     * @return TaskPreview object scene field
     */
    @Named("mapScene")
    protected ScenePreviewResponse mapScene(Scene scene) {
        SceneMapper sceneMapper = Mappers.getMapper(SceneMapper.class);
        return sceneMapper.daoToScenePreview(scene);
    }

    /**
     * Method to map Task taskSessions field to TaskPreview openSessions field
     *
     * @param taskSessions Task entity taskSessions field
     * @return TaskPreview object openSessions field
     */
    @Named("mapSessions")
    protected List<Long> mapSessions(List<TaskSession> taskSessions) {
        List<Long> sessions = new ArrayList<>();
        for (TaskSession t : taskSessions) {
            if (t.getFinishedAt() == null) {
                sessions.add(t.getId());
            }
        }
        return sessions;
    }
}
