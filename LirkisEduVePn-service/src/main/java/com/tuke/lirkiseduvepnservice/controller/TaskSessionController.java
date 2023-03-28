package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionFinishRequest;
import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionRequest;
import com.tuke.lirkiseduvepnservice.service.TaskSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/task-session")
public class TaskSessionController {

    private final TaskSessionService taskSessionService;

    @PostMapping("/start")
    public ResponseEntity<Long> create(@RequestBody TaskSessionRequest request) {
        Long sessionId = taskSessionService.startSession(request);
        return new ResponseEntity<>(sessionId, HttpStatus.OK);
    }

    @PostMapping("/finish")
    public ResponseEntity<Void> finish(@RequestBody TaskSessionFinishRequest request) {
        taskSessionService.finishSession(request);
        return ResponseEntity.ok().body(null);
    }
}
