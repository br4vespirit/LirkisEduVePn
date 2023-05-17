package com.tuke.lirkiseduvepnservice.model.dao;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * The Group class is an entity class representing a group of users within the system.
 * It contains an ID field, a name field, and list of tasks that the current group is allowed to complete.
 *
 * @author Dmytro Demianenko
 * @version 1.0
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "groups")
    private List<User> users;

    @ManyToMany(mappedBy = "groups")
    private List<Task> tasks;
}
