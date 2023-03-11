package com.tuke.lirkiseduvepnservice.model.dao;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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

    @OneToMany(mappedBy = "scene")
    private List<Task> tasks;

    @OneToMany(mappedBy = "scene", cascade = CascadeType.PERSIST)
    private List<SceneFile> sceneFiles;

    @OneToMany(mappedBy = "scene", cascade = CascadeType.PERSIST)
    private List<ScenePhoto> scenePhotos;
}
