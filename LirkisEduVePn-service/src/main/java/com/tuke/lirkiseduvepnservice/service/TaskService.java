package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.dao.Scenario;
import com.tuke.lirkiseduvepnservice.model.dao.Scene;
import com.tuke.lirkiseduvepnservice.model.dao.Task;
import com.tuke.lirkiseduvepnservice.model.dto.TaskRequestDto;
import com.tuke.lirkiseduvepnservice.repository.ScenarioRepository;
import com.tuke.lirkiseduvepnservice.repository.SceneRepository;
import com.tuke.lirkiseduvepnservice.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final SceneRepository sceneRepository;
    private final ScenarioRepository scenarioRepository;

    public void save(TaskRequestDto request) {
        Task task = new Task();
        // TODO: add custom exception to or else throw;
        Scene scene = sceneRepository.findById(request.getSceneId()).orElseThrow();
        Scenario scenario = scenarioRepository.findById(request.getScenarioId()).orElseThrow();

        task.setName(request.getName());
        task.setDescription(request.getDescription());
        task.setScene(scene);
        task.setScenario(scenario);

        scenario.getTasks().add(task);
        scene.getTasks().add(task);

        taskRepository.save(task);
    }
}
