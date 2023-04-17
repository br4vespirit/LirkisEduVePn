package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.TaskFilesDto;
import com.tuke.lirkiseduvepnservice.model.dto.TaskNames;
import com.tuke.lirkiseduvepnservice.model.dto.TaskRequestDto;
import com.tuke.lirkiseduvepnservice.model.dto.TasksPreview;
import com.tuke.lirkiseduvepnservice.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/task")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<Void> save(@RequestBody TaskRequestDto request) {
        taskService.save(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/preview/{id}")
    public ResponseEntity<List<TasksPreview>> get(@PathVariable(name = "id") Long id) {
        List<TasksPreview> tasksPreviews = taskService.getTasksPreview(id);
        return new ResponseEntity<>(tasksPreviews, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskFilesDto> getTaskFiles(@PathVariable(name = "id") Long id) {
        TaskFilesDto taskFiles = taskService.getTaskFiles(id);
        return new ResponseEntity<>(taskFiles, HttpStatus.OK);
    }

    @GetMapping("/names")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<List<TaskNames>> getTaskNames() {
        List<TaskNames> taskNames = taskService.getTaskNames();
        return new ResponseEntity<>(taskNames, HttpStatus.OK);
    }
}
