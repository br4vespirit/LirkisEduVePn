package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.TaskSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Extension of JPARepository that perform actions with a "task_session" table
 */
public interface TaskSessionRepository extends JpaRepository<TaskSession, Long> {

    /**
     * The findById method is used to retrieve a TaskSession entity from the taskSessionRepository based on its ID.
     *
     * @param id must not be {@literal null}.
     * @return An Optional containing the TaskSession entity if found, or an empty Optional if no matching entity is found.
     */
    Optional<TaskSession> findById(Long id);

    /**
     * The findAllByUserId method is used to retrieve a List of all TaskSession entities associated with the specified user ID.
     *
     * @param userId A Long representing the ID of the user to retrieve TaskSession entities for.
     * @return A List of TaskSession entities associated with the specified user ID.
     */
    List<TaskSession> findAllByUserId(Long userId);

    /**
     * The findAllByGroupId method is used to retrieve a List of all TaskSession entities associated with the specified group ID.
     *
     * @param groupsId A Long representing the ID of the group to retrieve TaskSession entities for.
     * @return A List of TaskSession entities associated with the specified group ID.
     */
    @Query(value = "select distinct ts from TaskSession ts " +
            "join ts.user u " +
            "join u.groups g " +
            "where g.id = ?1")
    List<TaskSession> findAllByGroupId(Long groupsId);
}