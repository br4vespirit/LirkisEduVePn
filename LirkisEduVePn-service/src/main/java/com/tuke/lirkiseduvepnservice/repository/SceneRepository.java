package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.Scene;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SceneRepository extends JpaRepository<Scene, Long> {
    Optional<Scene> findById(Long id);
}
