package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.exception.EmailRegisteredException;
import com.tuke.lirkiseduvepnservice.exception.IncorrectCurrentPasswordException;
import com.tuke.lirkiseduvepnservice.exception.PasswordMatchesException;
import com.tuke.lirkiseduvepnservice.model.dto.AuthenticationRequest;
import com.tuke.lirkiseduvepnservice.model.dto.RegisterRequest;
import com.tuke.lirkiseduvepnservice.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/registration")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        return authenticationService.register(request) ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Void> register(@RequestBody AuthenticationRequest request) throws
            IncorrectCurrentPasswordException,
            EmailRegisteredException,
            PasswordMatchesException {
        final String token = authenticationService.authenticate(request);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Authorization", token);
        return new ResponseEntity<>(responseHeaders, HttpStatus.OK);
    }

    @GetMapping("/confirm")
    public void confirm(@RequestParam("token") String token, HttpServletResponse httpServletResponse) {
        authenticationService.confirmToken(token);
        httpServletResponse.setHeader("Location", "http://localhost:4200/login");
        httpServletResponse.setStatus(302);
    }
}