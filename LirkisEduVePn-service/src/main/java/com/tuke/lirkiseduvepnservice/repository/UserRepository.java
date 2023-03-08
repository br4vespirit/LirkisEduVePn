package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Extension of JPARepository that perform actions with a "user" table
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Method to retrieve user from a database bu his email
     *
     * @param email username mail address
     * @return Optional of a user Entity
     */
    Optional<User> findByEmail(String email);


    /**
     * Method to validate if users exists with a given email
     *
     * @param email - mail address to check
     * @return true if user with given email exists otherwise false
     */
    boolean existsByEmail(String email);


    /**
     * Method to retrieve user's email by his id
     *
     * @param id id of a user
     * @return user mail address
     */
    @Query(nativeQuery = true, value = "select email from users where id = :id")
    String findEmailById(Long id);

    /**
     * Method to retrieve user's enctypted password by his id
     *
     * @param id id of a user
     * @return user encrypted password
     */
    @Query(nativeQuery = true, value = "select password from users where id = :id")
    String findPasswordById(Long id);

    /**
     * Method to enable user account after he confirmed his email address
     *
     * @param email mail address of a user to confirm
     */
    @Transactional
    @Modifying
    @Query("UPDATE User a SET a.isEnabled = TRUE WHERE a.email = ?1")
    void enableUser(String email);
}