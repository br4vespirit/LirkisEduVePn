package com.tuke.lirkiseduvepnservice.model.dao;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

/**
 * Represents a task session that a user has started.
 * A task session consists of the task that the user is attempting to complete,
 * the user who is attempting the task, and the details of the session, such as
 * when it started, when it finished, whether it was successful, and any firing attempts
 * made during the session.
 *
 * @author Dmytro Demianenko
 * @version 1.0
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TaskSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Timestamp startedAt;

    private Timestamp finishedAt;

    private Timestamp expiredAt;

    private boolean successful;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @OneToMany(mappedBy = "taskSession", cascade = CascadeType.REMOVE)
    private List<FiringAttempt> firingAttempts;
}
