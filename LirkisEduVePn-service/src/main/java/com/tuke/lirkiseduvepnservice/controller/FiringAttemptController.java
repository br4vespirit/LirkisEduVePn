package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.FiringAttemptRequest;
import com.tuke.lirkiseduvepnservice.service.FiringAttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/firing-attempt")
public class FiringAttemptController {

    private final FiringAttemptService firingAttemptService;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody FiringAttemptRequest request) {
        firingAttemptService.saveTransition(request);
        return ResponseEntity.ok().body(null);
    }
}