package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FiringAttemptRequest {
    private Long taskSessionId;
    private String action;
    private Timestamp actionDate;
    private boolean successful;
}
