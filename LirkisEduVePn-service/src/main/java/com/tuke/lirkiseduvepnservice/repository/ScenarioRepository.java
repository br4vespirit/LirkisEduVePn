package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScenarioRepository extends JpaRepository<Scenario, Long> {

    Optional<Scenario> findById(Long id);
}
