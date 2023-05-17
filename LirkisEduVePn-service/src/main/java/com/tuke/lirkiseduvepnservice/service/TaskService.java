package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.dao.LanguageFile;
import com.tuke.lirkiseduvepnservice.model.dao.Scenario;
import com.tuke.lirkiseduvepnservice.model.dao.Scene;
import com.tuke.lirkiseduvepnservice.model.dao.Task;
import com.tuke.lirkiseduvepnservice.model.dto.*;
import com.tuke.lirkiseduvepnservice.model.mapper.TaskMapper;
import com.tuke.lirkiseduvepnservice.repository.ScenarioRepository;
import com.tuke.lirkiseduvepnservice.repository.SceneRepository;
import com.tuke.lirkiseduvepnservice.repository.TaskRepository;
import com.tuke.lirkiseduvepnservice.utils.ImageResizer;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * TaskSessionService class contains methods to manage tasks
 */
@Service
@RequiredArgsConstructor
public class TaskService {

    /**
     * Repository for working with the "task" table in the database
     */
    private final TaskRepository taskRepository;

    /**
     * Repository for working with the "scene" table in the database
     */
    private final SceneRepository sceneRepository;

    /**
     * Repository for working with the "scenario" table in the database
     */
    private final ScenarioRepository scenarioRepository;

    /**
     * Mapper to map all Task data transfer objects and Task entity between each other
     */
    private final TaskMapper taskMapper;

    /**
     * ImageResizer class to resize images
     */
    private final ImageResizer imageResizer;


    /**
     * Creates a new task
     *
     * @param request object that contains all necessary data about task to create
     */
    public void save(TaskRequestDto request) {
        Task task = new Task();
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

    /**
     * Finds all tasks that are allowed to a given user
     *
     * @param id id of a user
     * @return List of TaskPreview object, where each contains dta about each task
     */
    @SneakyThrows
    public List<TasksPreview> getTasksPreview(Long id) {
        List<Task> tasks = taskRepository.findByUserId(id);
        List<TasksPreview> tasksPreviews = tasks.stream()
                .map(taskMapper::daoToTaskPreview)
                .toList();

        for (TasksPreview preview : tasksPreviews) {
            List<byte[]> resizedScenarioPhotos = imageResizer.resizeImages(preview.getScenario().getPhotos());
            preview.getScenario().setPhotos(resizedScenarioPhotos);
            byte[] resizedScenePhoto = imageResizer.resizeImage(preview.getScene().getPhoto(), 500, 300);
            preview.getScene().setPhoto(resizedScenePhoto);
        }

        return tasksPreviews;
    }

    /**
     * Returns TaskFilesDto object that contains task files with provided TaskFilesRequest object
     *
     * @param request request that contains id and language of a task
     * @return TaskFilesDto object
     */
    public TaskFilesDto getTaskFiles(TaskFilesRequest request) {
        Task task = taskRepository.findById(request.getTaskId()).orElseThrow();
        TaskFilesDto files = new TaskFilesDto();
        Scenario scenario = scenarioRepository.findById(task.getScenario().getId()).orElseThrow();

        files.setPnmlFile(scenario.getFile());
        for (LanguageFile languageFile : scenario.getLanguageFiles()) {
            if (languageFile.getExtension().name().equals(request.getLanguage())) {
                files.setLanguageFile(languageFile.getFile());
            }
        }

        return files;
    }

    /**
     * Finds in database all tasks and returns names of each one
     *
     * @return List of TaskNames object, where each contains name of the task
     */
    public List<TaskNames> getTaskNames() {
        return taskRepository.findAll().stream()
                .map(task -> new TaskNames(task.getId(), task.getName()))
                .toList();
    }
}
