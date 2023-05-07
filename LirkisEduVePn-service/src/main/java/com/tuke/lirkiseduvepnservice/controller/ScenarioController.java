package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.ScenarioPreviewResponse;
import com.tuke.lirkiseduvepnservice.model.dto.ScenarioRequest;
import com.tuke.lirkiseduvepnservice.service.ScenarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Rest endpoint for scenarios
 */
@RestController
@RequestMapping("/api/v1/scenario")
@RequiredArgsConstructor
@Tag(name = "Scenario")
public class ScenarioController {

    /**
     * Service that provide business logic to work with Scenario entity
     */
    private final ScenarioService scenarioService;

    /**
     * Endpoint to register a new scenario in database
     *
     * @param request request object to create scenario
     * @return HTTP status 200
     */
    @Operation(
            description = "Endpoint to register a new scenario in database",
            summary = "Register a scenario inside the application",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing",
                            responseCode = "200"
                    )
            }
    )
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<Void> save(@ModelAttribute ScenarioRequest request) {
        scenarioService.saveScenario(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Get a list of ScenarioPreviewResponse objects, which contain information about scenario
     *
     * @return HTTP status 200 and list of ScenarioPreviewResponse objects
     */
    @Operation(
            description = "Get a list of ScenarioPreviewResponse objects, which contain information about scenario",
            summary = "Get list of objects, which contain information about scenario",
            responses = {
                    @ApiResponse(
                            description = "Returns list of ScenarioPreviewResponse objects",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<List<ScenarioPreviewResponse>> get() {
        return new ResponseEntity<>(scenarioService.findAll(), HttpStatus.OK);
    }
}
