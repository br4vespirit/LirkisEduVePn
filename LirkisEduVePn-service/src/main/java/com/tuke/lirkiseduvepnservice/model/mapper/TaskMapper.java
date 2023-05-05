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

@Mapper(componentModel = "spring")
public abstract class TaskMapper {

    @Mapping(target = "scenario", source = "scenario", qualifiedByName = "mapScenario")
    @Mapping(target = "scene", source = "scene", qualifiedByName = "mapScene")
    @Mapping(target = "openSessions", source = "taskSessions", qualifiedByName = "mapSessions")
    public abstract TasksPreview daoToTaskPreview(Task task);

    @Named("mapScenario")
    protected ScenarioPreviewResponse mapScenario(Scenario scenario) {
        ScenarioMapper scenarioMapper = Mappers.getMapper(ScenarioMapper.class);
        return scenarioMapper.daoToScenarioPreview(scenario);
    }

    @Named("mapScene")
    protected ScenePreviewResponse mapScene(Scene scene) {
        SceneMapper sceneMapper = Mappers.getMapper(SceneMapper.class);
        return sceneMapper.daoToScenePreview(scene);
    }

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
