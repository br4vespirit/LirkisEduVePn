package com.tuke.lirkiseduvepnservice.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.tuke.lirkiseduvepnservice.model.Role;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.AuthenticationRequest;
import com.tuke.lirkiseduvepnservice.model.dto.RegisterRequest;
import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Value("${google.auth.ouath2.client-id}")
    private String clientId; // TODO change clientId in application properties

    public boolean register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail()))
            return false;
        User user = User.builder()
                .nickname(request.getNickname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .build();
        userRepository.save(user);
        return true;
    }

    public String authenticateForm(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        return jwtService.generateToken(user);
    }

    public String authenticateGoogle(String token) {
        GoogleIdToken googleToken;
        try {
            googleToken = verifier().verify(token);
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException(e);
        }

        String email = googleToken.getPayload().getEmail();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setRole(Role.STUDENT); // TODO maybe in no args constructor set this to STUDENT or even make STUDENT as default
            userRepository.save(user);
        }
        return jwtService.generateToken(user);
    }

    private GoogleIdTokenVerifier verifier() {
        return new GoogleIdTokenVerifier
                .Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singletonList(clientId))
                .build();
    }
}
