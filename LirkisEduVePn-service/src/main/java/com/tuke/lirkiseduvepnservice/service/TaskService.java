package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.LanguageExtension;
import com.tuke.lirkiseduvepnservice.model.dao.*;
import com.tuke.lirkiseduvepnservice.model.dto.TaskFilesDto;
import com.tuke.lirkiseduvepnservice.model.dto.TaskRequestDto;
import com.tuke.lirkiseduvepnservice.model.dto.TasksPreview;
import com.tuke.lirkiseduvepnservice.model.mapper.TaskMapper;
import com.tuke.lirkiseduvepnservice.repository.ScenarioRepository;
import com.tuke.lirkiseduvepnservice.repository.SceneRepository;
import com.tuke.lirkiseduvepnservice.repository.TaskRepository;
import com.tuke.lirkiseduvepnservice.utils.ImageResizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final SceneRepository sceneRepository;
    private final ScenarioRepository scenarioRepository;
    private final TaskMapper taskMapper;
    private final ImageResizer imageResizer;

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

    public List<TasksPreview> getTasksPreview() {
        List<Task> tasks = taskRepository.findAll();
        List<TasksPreview> tasksPreviews = tasks.stream()
                .map(taskMapper::daoToTaskPreview)
                .toList();

        for (TasksPreview preview : tasksPreviews) {
            List<byte[]> resizedScenarioPhotos = imageResizer.resizeImages(preview.getScenario().getPhotos());
            preview.getScenario().setPhotos(resizedScenarioPhotos);
            List<byte[]> resizedScenePhotos = imageResizer.resizeImages(preview.getScene().getPhotos());
            preview.getScene().setPhotos(resizedScenePhotos);
        }

        return tasksPreviews;
    }

    public TaskFilesDto getTaskFiles(Long id) {
        Task task = taskRepository.findById(id).orElseThrow();
        TaskFilesDto files = new TaskFilesDto();

        Scene scene = sceneRepository.findById(task.getScene().getId()).orElseThrow();
        Scenario scenario = scenarioRepository.findById(task.getScenario().getId()).orElseThrow();

        for (SceneFile sceneFile : scene.getSceneFiles()) {
            switch (sceneFile.getFileExtension()) {
                case TS -> files.setTsFile(sceneFile.getFile());
                case HTML -> files.setHtmlFile(sceneFile.getFile());
                case SPEC_TS -> files.setSpecTsFile(sceneFile.getFile());
            }
        }

        files.setPnmlFile(scenario.getFile());
        for (LanguageFile languageFile : scenario.getLanguageFiles()) {
            if (languageFile.getExtension().equals(LanguageExtension.SK)) {
                files.setLanguageFile(languageFile.getFile());
            }
        }

        return files;
    }
}
