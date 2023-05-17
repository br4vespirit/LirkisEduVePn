package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.ScenePreviewResponse;
import com.tuke.lirkiseduvepnservice.model.dto.SceneRequest;
import com.tuke.lirkiseduvepnservice.service.SceneService;
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
 * Rest endpoint for scenes
 */
@RestController
@RequestMapping("/api/v1/scene")
@RequiredArgsConstructor
@Tag(name = "Scene")
public class SceneController {

    /**
     * Service that provide business logic to work with Scene entity
     */
    private final SceneService sceneService;

    /**
     * Endpoint to register a new scene in database. Scene is already configured as component in Angular app.
     * So it is only needed to add information about the scene
     *
     * @param request request object to create scene
     * @return HTTP status 200
     */
    @Operation(
            description = "Endpoint to register a new scene in database. Scene is already configured as component in Angular app." +
                    "So it is only needed to add information about the scene",
            summary = "Register a scene inside the application",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing",
                            responseCode = "200"
                    )
            }
    )
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<Void> save(@ModelAttribute SceneRequest request) {
        sceneService.saveScene(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Get a list of ScenePreviewResponse objects, which contain information about scene
     *
     * @return HTTP status 200 and list of ScenePreviewResponse objects
     */
    @Operation(
            description = "Get a list of ScenePreviewResponse objects, which contain information about scene",
            summary = "Get list of objects, which contain information about scene",
            responses = {
                    @ApiResponse(
                            description = "Returns list of ScenePreviewResponse objects",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<List<ScenePreviewResponse>> get() {
        return new ResponseEntity<>(sceneService.findAll(), HttpStatus.OK);
    }
}