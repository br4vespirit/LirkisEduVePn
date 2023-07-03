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
import com.tuke.lirkiseduvepnservice.repository.GroupRepository;
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

/**
 * Service layer class to implement business logic of all methods which are linked with a user authentication
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    /**
     * JPA repository to manage user
     */
    private final UserRepository userRepository;


    /**
     * Implementation of an PasswordEncoder interface to encrypt and match passwords
     */
    private final PasswordEncoder passwordEncoder;


    /**
     * Service that contains logic with a JWT token
     */
    private final JwtService jwtService;


    /**
     * Implementation of an AuthenticationManager interface to authenticate user with his credentials
     */
    private final AuthenticationManager authenticationManager;


    /**
     * Service that implements logic for working with confirmation tokens
     */
    private final ConfirmationTokenService confirmationTokenService;


    /**
     * Service that implements logic to work with users
     */
    private final UserService userService;


    /**
     * Implementation of an EmailSender interface to send confirmation to a users' email
     */
    private final EmailSender emailSender;

    private final GroupRepository groupRepository;


    /**
     * Method to register a new user inside a "users" database
     *
     * @param request request with a users' registration data
     * @return true if user was registered otherwise false
     */
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
        // String link = "http://localhost:8080/api/v1/auth/confirm?token=" + confirmationToken;
        String link = "http://147.232.205.222:8080/api/v1/auth/confirm?token=" + confirmationToken;
        emailSender.send(
                request.getEmail(),
                request.getFirstname() + " " + request.getLastname(),
                link);
        return true;
    }


    /**
     * Method to authenticate registered user that has requested som secured API
     *
     * @param request user login data to authenticate
     * @return JWT token that will be used for a further authorization
     * @throws IncorrectPasswordException exception that will be thrown if user enters incorrect password
     * @throws EmailNotExistsException    exception that will be thrown if user enters email that doesn't exist
     * @throws EmailNotVerifiedException  exception that will be thrown if user enters email that is not confirmed
     */
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


    /**
     * Method to confirm user email via his mailbox
     *
     * @param token token that is mapped to a user account that should be confirmed
     */
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
