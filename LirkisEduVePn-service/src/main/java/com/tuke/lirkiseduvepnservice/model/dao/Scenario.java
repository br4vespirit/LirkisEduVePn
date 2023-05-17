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
 * Represents a scenario of tasks in application. A scenario is defined of .pnml or .cpn file
 * which described how user should perform when completing a session. Also, it consists of language file
 * (on what language text will be represented in application) and some photos of scenario.
 *
 * @author Dmytro Demianenko
 * @version 1.0
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Scenario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Lob
    @Column(name = "pnml_file")
    @JdbcType(VarbinaryJdbcType.class)
    private byte[] file;

    @OneToMany(mappedBy = "scenario")
    private List<Task> tasks;

    @OneToMany(mappedBy = "scenario", cascade = CascadeType.PERSIST)
    private List<LanguageFile> languageFiles;

    @OneToMany(mappedBy = "scenario", cascade = CascadeType.PERSIST)
    private List<ScenarioPhoto> scenarioPhotos;
}
