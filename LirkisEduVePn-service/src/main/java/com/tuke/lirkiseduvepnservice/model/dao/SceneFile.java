package com.tuke.lirkiseduvepnservice.model.dao;

import com.tuke.lirkiseduvepnservice.model.SceneFileExtension;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SceneFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @JdbcType(VarbinaryJdbcType.class)
    private byte[] file;

    @Enumerated(EnumType.STRING)
    private SceneFileExtension fileExtension;

    @ManyToOne
    @JoinColumn(name = "scene_id", nullable = false)
    private Scene scene;
}