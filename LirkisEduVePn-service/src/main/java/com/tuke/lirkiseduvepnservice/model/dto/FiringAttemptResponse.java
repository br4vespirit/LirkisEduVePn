package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FiringAttemptResponse {
    private String action;
    private boolean actionFound;
    private boolean successful;
    private List<String> actionTargets;
}