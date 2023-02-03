package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.exception.EmailRegisteredException;
import com.tuke.lirkiseduvepnservice.exception.IncorrectCurrentPasswordException;
import com.tuke.lirkiseduvepnservice.exception.PasswordMatchesException;
import com.tuke.lirkiseduvepnservice.mail.EmailService;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.ProfileUpdateRequest;
import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.model.mapper.UserMapper;
import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final ConfirmationTokenService confirmationTokenService;

    public UserProfileDto get(String jwt) {
        if (jwt == null)
            return null;
        String email = jwtService.extractEmail(jwt.substring(7));
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null)
            return null;
        return userMapper.daoToDto(user);
    }

    public void enableUser(String email) {
        userRepository.enableUser(email);
    }

    public UserProfileDto update(ProfileUpdateRequest request) throws
            EmailRegisteredException,
            PasswordMatchesException,
            IncorrectCurrentPasswordException {
        boolean toChangePassword = false;
        boolean toChangeEmail = false;

        final String reqEmail = request.getEmail();
        final String idEmail = userRepository.findEmailById(request.getId());
        if (userRepository.existsByEmail(reqEmail) && !reqEmail.equals(idEmail))
            throw new EmailRegisteredException("This email is already registered");
        else if (!reqEmail.equals(idEmail))
            toChangeEmail = true;


        if (!request.getNewPassword().equals("") || !request.getRepeatNewPassword().equals("")) {
            if (!request.getNewPassword().equals(request.getRepeatNewPassword()))
                throw new PasswordMatchesException("Passwords are mismatched");
            else {
                final String password = userRepository.findPasswordById(request.getId());
                String t = passwordEncoder.encode(password);
                if (!passwordEncoder.matches(request.getCurrentPassword(), password))
                    throw new IncorrectCurrentPasswordException("Incorrect current password");
                toChangePassword = true;
            }
        }

        User user = userRepository.findById(request.getId()).orElse(null);
        if (user == null)
            return null;
        user.setEmail(reqEmail);
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setNickname(request.getNickname());
        if (toChangePassword)
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        if (toChangeEmail) {
            user.setEnabled(false);
            String confirmationToken = confirmationTokenService.generateConfirmationToken(user);
            emailService.send(reqEmail, user.getFirstname() + " " + user.getLastname(), "http://localhost:8080/api/v1/auth/confirm?token=" + confirmationToken);
        }

        userRepository.save(user);
        return userMapper.daoToDto(user);
    }
}
