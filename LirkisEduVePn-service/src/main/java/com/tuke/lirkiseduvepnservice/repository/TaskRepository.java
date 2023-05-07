package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Extension of JPARepository that perform actions with a "task" table
 */
public interface TaskRepository extends JpaRepository<Task, Long> {

    /**
     * The findById method is used to retrieve a Task entity from the taskRepository based on its ID.
     *
     * @param id must not be {@literal null}.
     * @return An Optional containing the Task entity if found, or an empty Optional if no matching entity is found.
     */
    Optional<Task> findById(Long id);

    /**
     * The findByUserId method is used to retrieve a List of all Task entities associated with the specified user ID.
     *
     * @param id A Long representing the ID of the user to retrieve Task entities for.
     * @return A List of Task entities associated with the specified user ID.
     */
    @Query(value = "select distinct t from Task t " +
            "join t.groups g " +
            "join g.users u " +
            "where u.id = ?1")
    List<Task> findByUserId(Long id);
}
