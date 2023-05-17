package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Extension of JPARepository that perform actions with a "group" table
 */
public interface GroupRepository extends JpaRepository<Group, Long> {

    /**
     * The findById method is used to retrieve a Group entity from the groupRepository based on its ID.
     *
     * @param id must not be {@literal null}.
     * @return An Optional containing the Group entity if found, or an empty Optional if no matching entity is found.
     */
    Optional<Group> findById(Long id);
}
