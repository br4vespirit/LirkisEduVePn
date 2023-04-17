package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findById(Long id);

    @Query(value = "select distinct t from Task t " +
            "join t.groups g " +
            "join g.users u " +
            "where u.id = ?1")
    List<Task> findByUserId(Long id);
}
