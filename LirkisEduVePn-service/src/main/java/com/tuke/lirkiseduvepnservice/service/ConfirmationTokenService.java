package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.dao.ConfirmationToken;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.repository.ConfirmationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

/**
 * Service layer class to implement business logic of methods which are linked with a confirmation toke of a user
 */
@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {

    /**
     * JPA repository for managing confirmation tokens
     */
    private final ConfirmationTokenRepository confirmationTokenRepository;


    /**
     * Method to save newly generated token into a database
     *
     * @param token confirmation token to save
     */
    public void saveToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }


    /**
     * Method to retrieve a ConfirmationToken entity
     *
     * @param token token in a string format which represents entity
     * @return Optional of a ConfirmationToken entity
     */
    public Optional<ConfirmationToken> get(String token) {
        return confirmationTokenRepository.findByToken(token);
    }


    /**
     * Method to confirm token. It fills confirmedAt field with a date which will signalize that user has confirmed his account
     *
     * @param token token to confirm
     */
    public void setConfirmedAt(String token) {
        confirmationTokenRepository.updateConfirmedAt(token, LocalDateTime.now());
    }


    /**
     * Method to generate confirmation token for a newly registered user. Token is generated with UUID class
     *
     * @param user user to which newly generated token will be assigned
     * @return generated confirmation token
     */
    public String generateConfirmationToken(User user) {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );
        saveToken(confirmationToken);
        return token;
    }
}
