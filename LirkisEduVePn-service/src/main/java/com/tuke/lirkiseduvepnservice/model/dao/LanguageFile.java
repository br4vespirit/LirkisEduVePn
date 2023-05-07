package com.tuke.lirkiseduvepnservice.model.dao;

import com.tuke.lirkiseduvepnservice.model.LanguageExtension;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

/**
 * Represents a language file of Scenario entity. The file is saved in a byte[] format inside the database.
 * Each Scenario can have different language files
 *
 * @author Dmytro Demianenko
 * @version 1.0
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LanguageFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @JdbcType(VarbinaryJdbcType.class)
    private byte[] file;

    @ManyToOne
    @JoinColumn(name = "scenario_id", nullable = false)
    private Scenario scenario;

    @Enumerated(EnumType.STRING)
    private LanguageExtension extension;
}
