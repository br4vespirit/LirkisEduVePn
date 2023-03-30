package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.FiringAttemptRequest;
import com.tuke.lirkiseduvepnservice.model.dto.FiringAttemptResponse;
import com.tuke.lirkiseduvepnservice.service.FiringAttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/session/{id}")
    public ResponseEntity<List<FiringAttemptResponse>> get(@PathVariable(name = "id") Long id) {
        List<FiringAttemptResponse> response = firingAttemptService.getAll(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}