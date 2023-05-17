package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * Data Transfer Object response that represents information of each task session
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskSessionInfo {
    private Long id;
    private String taskName;
    private Timestamp finishedAt;
    private Timestamp startedAt;
    private boolean successful;
    private String userName;
}
