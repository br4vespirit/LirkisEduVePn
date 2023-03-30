package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.FiringAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FiringAttemptRepository extends JpaRepository<FiringAttempt, Long> {

    @Query(nativeQuery = true, value = "select * from firing_attempt f where f.task_session_id = ?1 and f.successful = true")
    List<FiringAttempt> findBySessionIdAndTrue(Long id);
}