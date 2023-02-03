package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.exception.EmailNotExistsException;
import com.tuke.lirkiseduvepnservice.exception.EmailNotVerifiedException;
import com.tuke.lirkiseduvepnservice.exception.IncorrectPasswordException;
import com.tuke.lirkiseduvepnservice.mail.EmailSender;
import com.tuke.lirkiseduvepnservice.model.Role;
import com.tuke.lirkiseduvepnservice.model.dao.ConfirmationToken;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.AuthenticationRequest;
import com.tuke.lirkiseduvepnservice.model.dto.RegisterRequest;
import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ConfirmationTokenService confirmationTokenService;
    private final UserService userService;
    private final EmailSender emailSender;

    public boolean register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail()))
            return false;
        User user = User.builder()
                .nickname(request.getNickname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .role(Role.STUDENT)
                .build();
        userRepository.save(user);
        String confirmationToken = confirmationTokenService.generateConfirmationToken(user);
        String link = "http://localhost:8080/api/v1/auth/confirm?token=" + confirmationToken;
        emailSender.send(
                request.getEmail(),
                request.getFirstname() + " " + request.getLastname(),
                link);
        return true;
    }

    public String authenticate(AuthenticationRequest request) throws
            IncorrectPasswordException,
            EmailNotExistsException,
            EmailNotVerifiedException {
        if (!userRepository.existsByEmail(request.getEmail()))
            throw new EmailNotExistsException("Entered email doesn't exist");
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new IncorrectPasswordException("Password is incorrect");
        } catch (DisabledException e) {
            throw new EmailNotVerifiedException("Entered email is not verified yet");
        }
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        return jwtService.generateToken(user);
    }

    @Transactional
    public void confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .get(token)
                .orElseThrow(() -> new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null)
            throw new IllegalStateException("email already confirmed");

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();
        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        userService.enableUser(confirmationToken.getUser().getEmail());
    }
}
