package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Extension of JPARepository that perform actions with a "confirmation_token" table
 */
@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {

    /**
     * Method to retrieve ConfirmationToken entity by the token
     *
     * @param token token in string format that belongs to a special user to confirm his account
     * @return Optional of a ConfirmationToken entity
     */
    Optional<ConfirmationToken> findByToken(String token);

    /**
     * Method to confirm token in database
     *
     * @param token       token that should be confirmed
     * @param confirmedAt confirmation date
     */
    @Transactional
    @Modifying
    @Query("UPDATE ConfirmationToken c SET c.confirmedAt = ?2 WHERE c.token = ?1")
    void updateConfirmedAt(String token, LocalDateTime confirmedAt);
}