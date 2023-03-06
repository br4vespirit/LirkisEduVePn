package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.exception.*;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioPreviewResponse;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioRequestDto;
import com.tuke.lirkiseduvepnservice.service.ScenarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/scenario")
@RequiredArgsConstructor
public class ScenarioController {

    private final ScenarioService scenarioService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> save(@ModelAttribute ScenarioRequestDto request) throws
            UnknownDirectoryException,
            UnknownFileException,
            InstanceNotFoundException,
            IncorrectFileExtensionException,
            IncorrectLanguageExtensionException {
        scenarioService.saveScenario(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ScenarioPreviewResponse>> get() {
        return new ResponseEntity<>(scenarioService.findAll(), HttpStatus.OK);
    }
}
