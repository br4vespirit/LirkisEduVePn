package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.TaskSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaskSessionRepository extends JpaRepository<TaskSession, Long> {
    Optional<TaskSession> findById(Long id);

    // TODO: validate if it is correct
    List<TaskSession> findAllByUserId(Long userId);

    @Query(value = "select distinct ts from TaskSession ts " +
            "join ts.user u " +
            "join u.groups g " +
            "where g.id = ?1")
    List<TaskSession> findAllByGroupId(Long groupsId);
}