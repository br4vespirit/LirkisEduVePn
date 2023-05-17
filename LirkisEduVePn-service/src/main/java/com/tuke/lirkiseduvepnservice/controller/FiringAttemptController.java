package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.FiringAttemptRequest;
import com.tuke.lirkiseduvepnservice.model.dto.FiringAttemptResponse;
import com.tuke.lirkiseduvepnservice.service.FiringAttemptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Rest endpoint for firing attempts
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/firing-attempt")
@Tag(name = "Firing Attempt")
public class FiringAttemptController {

    /**
     * Service that provide business logic to work with FiringAttempt entity
     */
    private final FiringAttemptService firingAttemptService;

    /**
     * Endpoint to create a new firing attempt which will be linked to a session provided in request
     *
     * @param request FiringAttemptRequest object that contains information about firing attempt to create
     * @return HTTP status 200
     */
    @Operation(
            description = "Endpoint to create a new firing attempt which will be linked to a session provided in request",
            summary = "Create firing attempt",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing",
                            responseCode = "200"
                    )
            }
    )
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody FiringAttemptRequest request) {
        firingAttemptService.saveTransition(request);
        return ResponseEntity.ok().body(null);
    }

    /**
     * Endpoint to get list of firing attempts that belong to a given session id
     *
     * @param id iid of task session
     * @return HTTP status 200 and list of firing attempts
     */
    @Operation(
            description = "Endpoint to get list of firing attempts that belong to a given session id",
            summary = "Get list of firing attempts",
            responses = {
                    @ApiResponse(
                            description = "Returns list of firing attempts",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/session/{id}")
    public ResponseEntity<List<FiringAttemptResponse>> get(@PathVariable(name = "id") Long id) {
        List<FiringAttemptResponse> response = firingAttemptService.getAll(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}