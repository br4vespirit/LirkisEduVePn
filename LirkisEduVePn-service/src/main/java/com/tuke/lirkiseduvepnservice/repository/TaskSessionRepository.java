package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.TaskSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskSessionRepository extends JpaRepository<TaskSession, Long> {
    Optional<TaskSession> findById(Long id);

    // TODO: validate if it is correct
    List<TaskSession> findAllByUserId(Long userId);
}