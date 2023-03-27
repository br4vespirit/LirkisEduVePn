package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.TaskFilesDto;
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

    @GetMapping("/preview")
    public ResponseEntity<List<TasksPreview>> get() {
        List<TasksPreview> tasksPreviews = taskService.getTasksPreview();
        return new ResponseEntity<>(tasksPreviews, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskFilesDto> getTaskFiles(@PathVariable(name = "id") Long id) {
        TaskFilesDto taskFiles = taskService.getTaskFiles(id);
        return new ResponseEntity<>(taskFiles, HttpStatus.OK);
    }
}