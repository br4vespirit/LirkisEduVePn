package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.Scene;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Extension of JPARepository that perform actions with a "scene" table
 */
public interface SceneRepository extends JpaRepository<Scene, Long> {

    /**
     * The findById method is used to retrieve a Scene entity from the sceneRepository based on its ID.
     *
     * @param id must not be {@literal null}.
     * @return An Optional containing the Scene entity if found, or an empty Optional if no matching entity is found.
     */
    Optional<Scene> findById(Long id);
}
