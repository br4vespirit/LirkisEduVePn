package com.tuke.lirkiseduvepnservice.model.dao;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Represents a task that allowed users can start and complete.
 * A task consists of the VR scene, scenario as configuration file,
 * and the details of the task, such as all task sessions that belongs to this task,
 * groups that are allowed to complete this task, and name and description of it
 *
 * @author Dmytro Demianenko
 * @version 1.0
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "scenario_id", nullable = false)
    private Scenario scenario;

    @ManyToOne
    @JoinColumn(name = "scene_id", nullable = false)
    private Scene scene;

    @OneToMany(mappedBy = "task")
    private List<TaskSession> taskSessions;

    @ManyToMany
    @JoinTable(
            name = "groups_tasks",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private List<Group> groups;
}
