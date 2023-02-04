package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query(nativeQuery = true, value = "select email from users where id = :id")
    String findEmailById(Long id);

    @Query(nativeQuery = true, value = "select password from users where id = :id")
    String findPasswordById(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE User a SET a.isEnabled = TRUE WHERE a.email = ?1")
    void enableUser(String email);
}