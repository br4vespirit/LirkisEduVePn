package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.AuthenticationRequest;
import com.tuke.lirkiseduvepnservice.model.dto.RegisterRequest;
import com.tuke.lirkiseduvepnservice.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    //    @CrossOrigin("http://localhost:4200")
    @PostMapping("/registration")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        return authenticationService.register(request) ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Void> register(@RequestBody AuthenticationRequest request) {
        final String token = authenticationService.authenticate(request);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Authorization", token);
        return new ResponseEntity<>(responseHeaders, HttpStatus.OK);
    }
}