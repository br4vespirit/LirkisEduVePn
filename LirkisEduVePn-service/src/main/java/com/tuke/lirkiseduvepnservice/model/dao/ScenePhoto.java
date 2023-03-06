package com.tuke.lirkiseduvepnservice.model.dao;

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
public class ScenePhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "scene_id", nullable = false)
    private Scene scene;

    @Lob
    @JdbcType(VarbinaryJdbcType.class)
    private byte[] photo;
}
