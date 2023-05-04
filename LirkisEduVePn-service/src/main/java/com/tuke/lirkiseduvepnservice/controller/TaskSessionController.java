package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionFinishRequest;
import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionInfo;
import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionRequest;
import com.tuke.lirkiseduvepnservice.service.TaskSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")
    public ResponseEntity<List<TaskSessionInfo>> get(@PathVariable(name = "id") Long userId) {
        List<TaskSessionInfo> taskSessionInfos = taskSessionService.getInfoList(userId);
        return new ResponseEntity<>(taskSessionInfos, HttpStatus.OK);
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<List<TaskSessionInfo>> getByGroupsId(@PathVariable(name = "id") Long groupId) {
        List<TaskSessionInfo> taskSessionInfos = taskSessionService.getInfoListByGroup(groupId);
        return new ResponseEntity<>(taskSessionInfos, HttpStatus.OK);
    }
}
