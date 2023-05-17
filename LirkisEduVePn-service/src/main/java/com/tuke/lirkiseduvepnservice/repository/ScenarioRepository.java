package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Extension of JPARepository that perform actions with a "scenario" table
 */
public interface ScenarioRepository extends JpaRepository<Scenario, Long> {

    /**
     * The findById method is used to retrieve a Scenario entity from the scenarioRepository based on its ID.
     *
     * @param id must not be {@literal null}.
     * @return An Optional containing the Scenario entity if found, or an empty Optional if no matching entity is found.
     */
    Optional<Scenario> findById(Long id);
}
