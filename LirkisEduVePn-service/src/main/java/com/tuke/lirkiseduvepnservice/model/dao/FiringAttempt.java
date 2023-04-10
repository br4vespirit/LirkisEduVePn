package com.tuke.lirkiseduvepnservice.model.dao;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class FiringAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200)
    private String action;

    private Timestamp actionDate;

    private boolean successful;

    @ManyToOne
    @JoinColumn(name = "task_session_id", nullable = false)
    private TaskSession taskSession;

    private boolean actionFound;

    @ElementCollection
    private List<String> actionTargets;
}
