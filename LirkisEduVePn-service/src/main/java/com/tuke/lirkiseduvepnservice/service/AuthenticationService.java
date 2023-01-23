package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.Role;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.AuthenticationRequest;
import com.tuke.lirkiseduvepnservice.model.dto.RegisterRequest;
import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

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

    public String authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        return jwtService.generateToken(user);
    }
}
