package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * Data Transfer Object request for finish session
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskSessionFinishRequest {
    private Long taskSessionId;
    private boolean successful;
    private Timestamp finishTime;
}
