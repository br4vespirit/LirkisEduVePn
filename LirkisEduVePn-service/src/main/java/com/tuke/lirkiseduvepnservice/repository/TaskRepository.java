package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findById(Long id);
}
