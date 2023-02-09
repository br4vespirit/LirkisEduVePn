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

import java.util.List;

/**
 * Service layer class to implement business logic of methods which are linked with User
 */
@Service
@RequiredArgsConstructor
public class UserService {

    /**
     * Mapper to map between DAO and DTO users
     */
    private final UserMapper userMapper;


    /**
     * JPA repository for a user management
     */
    private final UserRepository userRepository;


    /**
     * Service that contains logic with a JWT token
     */
    private final JwtService jwtService;


    /**
     * Implementation of an PasswordEncoder interface to encrypt and match passwords
     */
    private final PasswordEncoder passwordEncoder;


    /**
     *
     */
    private final EmailService emailService;


    /**
     * Service that implements logic for working with confirmation tokens
     */
    private final ConfirmationTokenService confirmationTokenService;


    /**
     * Method to get user profile data with given JWT token
     *
     * @param jwt token to decode
     * @return user profile data
     */
    public UserProfileDto get(String jwt) {
        if (jwt == null)
            return null;
        String email = jwtService.extractEmail(jwt.substring(7));
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null)
            return null;
        return userMapper.daoToDto(user);
    }


    /**
     * Method to enable user account by his email
     *
     * @param email email of user to be enabled
     */
    public void enableUser(String email) {
        userRepository.enableUser(email);
    }


    /**
     * Method to update user from user settings, user perform update by himself.
     * When user changes his email, his account becomes disabled anf new confirmation token creates and email with confirmation sends to a user mailbox
     *
     * @param request updated data received from a client
     * @return updated user profile data
     * @throws EmailRegisteredException          when user changes his email and this email is already exists
     * @throws PasswordMatchesException          when user tries to change his password and entered new password and repeated new password do not matches
     * @throws IncorrectCurrentPasswordException when user tries to change his password, but he entered incorrectly his current password
     */
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


    /**
     * Method to retrieve all users from database and map them to to their profile then
     *
     * @return list of users profiles
     */
    public List<UserProfileDto> findAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::daoToDto)
                .toList();
    }
}
