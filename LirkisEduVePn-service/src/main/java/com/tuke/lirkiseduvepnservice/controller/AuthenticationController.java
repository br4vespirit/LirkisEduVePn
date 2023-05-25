package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.exception.*;
import com.tuke.lirkiseduvepnservice.model.dto.AuthenticationRequest;
import com.tuke.lirkiseduvepnservice.model.dto.RegisterRequest;
import com.tuke.lirkiseduvepnservice.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Rest endpoint for authentication
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    /**
     * Service that provides method for user authentication
     */
    private final AuthenticationService authenticationService;


    /**
     * Endpoints that is used to register a new user
     *
     * @param request request with a registration data
     * @return only status OK or BAD_REQUEST
     */
    @Operation(
            description = "Endpoint to register a new user in application with given RegisterRequest object",
            summary = "Register a user",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing. User was registered",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Returns nothing. User wasn't registered",
                            responseCode = "400"
                    )
            }
    )
    @PostMapping("/registration")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        return authenticationService.register(request) ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    /**
     * Endpoint that is used to authenticate user
     *
     * @param request request that contains login data
     * @return only status with JWT token inside headers
     * @throws IncorrectPasswordException exception that will be thrown if user enters incorrect password
     * @throws EmailNotExistsException    exception that will be thrown if user enters email that doesn't exist
     * @throws EmailNotVerifiedException  exception that will be thrown if user enters email that is not confirmed
     */
    @Operation(
            description = "Endpoint to authenticate a user in application with given AuthenticationRequest object",
            summary = "Authenticate a user",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing. User was authenticated",
                            responseCode = "200"
                    )
            }
    )
    @PostMapping("/authenticate")
    public ResponseEntity<Void> authenticate(@RequestBody AuthenticationRequest request) throws
            IncorrectCurrentPasswordException,
            EmailRegisteredException,
            PasswordMatchesException {
        final String token = authenticationService.authenticate(request);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Authorization", token);
        return new ResponseEntity<>(responseHeaders, HttpStatus.OK);
    }


    /**
     * Endpoint that is used to confirm user account, set it to enabled status and redirect to an Angular login page
     *
     * @param token               confirmation token that will be confirmed
     * @param httpServletResponse http response which will redirect user to an Angular login page after he pressed "Activate" link in his mailbox
     */
    @Operation(
            description = "Endpoint to confirm registration with provided confirmation token",
            summary = "Confirm registration",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing. Registration is confirmed. User is redirected to an Angular page",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/confirm")
    public void confirm(@RequestParam("token") String token, HttpServletResponse httpServletResponse) {
        authenticationService.confirmToken(token);
        httpServletResponse.setHeader("Location", "http://localhost:4200/login");
        // httpServletResponse.setHeader("Location", "http://147.232.205.222:4200/login");
        httpServletResponse.setStatus(302);
    }
}