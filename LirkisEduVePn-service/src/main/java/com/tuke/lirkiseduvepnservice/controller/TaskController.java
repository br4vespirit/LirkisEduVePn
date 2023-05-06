package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.*;
import com.tuke.lirkiseduvepnservice.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/task")
@Tag(name = "Task")
public class TaskController {

    private final TaskService taskService;

    @Operation(
            description = "Endpoint to create a new task",
            summary = "Start task",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing",
                            responseCode = "200"
                    )
            }
    )
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<Void> save(@RequestBody TaskRequestDto request) {
        taskService.save(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(
            description = "Endpoint to get task information for a preview",
            summary = "Get task information",
            responses = {
                    @ApiResponse(
                            description = "Returns object with task information",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/preview/{id}")
    public ResponseEntity<List<TasksPreview>> get(@PathVariable(name = "id") Long id) {
        List<TasksPreview> tasksPreviews = taskService.getTasksPreview(id);
        return new ResponseEntity<>(tasksPreviews, HttpStatus.OK);
    }

    @Operation(
            description = "Endpoint to get task files from scenario",
            summary = "Get task files",
            responses = {
                    @ApiResponse(
                            description = "Returns object with scenario files",
                            responseCode = "200"
                    )
            }
    )
    @PostMapping("/files")
    public ResponseEntity<TaskFilesDto> getTaskFiles(@RequestBody TaskFilesRequest request) {
        TaskFilesDto taskFiles = taskService.getTaskFiles(request);
        return new ResponseEntity<>(taskFiles, HttpStatus.OK);
    }

    @Operation(
            description = "Endpoint to get list of TaskName object that contains task name and id",
            summary = "Get list of TaskName objects",
            responses = {
                    @ApiResponse(
                            description = "Returns list of TaskName objects",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/names")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<List<TaskNames>> getTaskNames() {
        List<TaskNames> taskNames = taskService.getTaskNames();
        return new ResponseEntity<>(taskNames, HttpStatus.OK);
    }
}
