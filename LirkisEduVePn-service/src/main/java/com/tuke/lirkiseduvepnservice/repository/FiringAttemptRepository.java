package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.FiringAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Extension of JPARepository that perform actions with a "firing_attempt" table
 */
public interface FiringAttemptRepository extends JpaRepository<FiringAttempt, Long> {

    /**
     * The findBySessionIdAndTrue method is used to retrieve a List of all FiringAttempt entities associated
     * with the specified task session ID. It only returns FiringAttempt entities where the "successful" field is true.
     *
     * @param id A Long representing the ID of the task session to retrieve firing attempts for.
     * @return A List of FiringAttempt entities associated with the specified task session ID, where the "successful" field is true.
     */
    @Query(nativeQuery = true, value = "select * from firing_attempt f where f.task_session_id = ?1")
    List<FiringAttempt> findBySessionIdAndTrue(Long id);
}