package com.tuke.lirkiseduvepnservice.model.dao;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

import java.util.List;

/**
 * Represents a scene for completing different tasks in the system.
 * A scene consists of the name and description, photo of the scene,
 * tasks that are created of this scene and the folder name of the scene
 * that is saved in the Angular project.
 *
 * @author Dmytro Demianenko
 * @version 1.0
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Scene {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String folderName;

    @Lob
    @Column(name = "photo")
    @JdbcType(VarbinaryJdbcType.class)
    private byte[] photo;

    @OneToMany(mappedBy = "scene")
    private List<Task> tasks;
}