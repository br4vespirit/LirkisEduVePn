package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionFinishRequest;
import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionInfo;
import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionRequest;
import com.tuke.lirkiseduvepnservice.service.TaskSessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/task-session")
@Tag(name = "Task Session")
public class TaskSessionController {

    private final TaskSessionService taskSessionService;

    @Operation(
            description = "Endpoint to start a task session in web application with " +
                    "TaskSessionRequest object, that contains information about task",
            summary = "Start session (task)",
            responses = {
                    @ApiResponse(
                            description = "Returns id of created session",
                            responseCode = "200"
                    )
            }
    )
    @PostMapping("/start")
    public ResponseEntity<Long> create(@RequestBody TaskSessionRequest request) {
        Long sessionId = taskSessionService.startSession(request);
        return new ResponseEntity<>(sessionId, HttpStatus.OK);
    }

    @Operation(
            description = "Endpoint to end a task session in web application with " +
                    "TaskSessionFinishRequest object, that contains information about session",
            summary = "Finish session (task)",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing",
                            responseCode = "200"
                    )
            }
    )
    @PostMapping("/finish")
    public ResponseEntity<Void> finish(@RequestBody TaskSessionFinishRequest request) {
        taskSessionService.finishSession(request);
        return ResponseEntity.ok().body(null);
    }

    @Operation(
            description = "Endpoint to get all task sessions information that belongs to a user with provided user id",
            summary = "Get list of task sessions information by user id",
            responses = {
                    @ApiResponse(
                            description = "Returns list of task sessions information",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<List<TaskSessionInfo>> get(@PathVariable(name = "id") Long userId) {
        List<TaskSessionInfo> taskSessionInfos = taskSessionService.getInfoList(userId);
        return new ResponseEntity<>(taskSessionInfos, HttpStatus.OK);
    }

    @Operation(
            description = "Endpoint to get all task sessions information that belongs to a group with provided group id",
            summary = "Get list of task sessions information by group id",
            responses = {
                    @ApiResponse(
                            description = "Returns list of task sessions information",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/group/{id}")
    public ResponseEntity<List<TaskSessionInfo>> getByGroupsId(@PathVariable(name = "id") Long groupId) {
        List<TaskSessionInfo> taskSessionInfos = taskSessionService.getInfoListByGroup(groupId);
        return new ResponseEntity<>(taskSessionInfos, HttpStatus.OK);
    }
}
