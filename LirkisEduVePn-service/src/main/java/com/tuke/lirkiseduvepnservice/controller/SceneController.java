package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.ScenePreviewResponse;
import com.tuke.lirkiseduvepnservice.model.dto.SceneRequest;
import com.tuke.lirkiseduvepnservice.service.SceneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/scene")
@RequiredArgsConstructor
public class SceneController {

    private final SceneService sceneService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<Void> save(@ModelAttribute SceneRequest request) {
        sceneService.saveScene(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<List<ScenePreviewResponse>> get() {
        return new ResponseEntity<>(sceneService.findAll(), HttpStatus.OK);
    }
}