package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

/**
 * Data Transfer Object that represents request for creating firing attempt that will be linked to a provided session id
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FiringAttemptRequest {
    private Long taskSessionId;
    private String action;
    private Timestamp actionDate;
    private boolean successful;
    private boolean actionFound;
    private List<String> actionTargets;
}
