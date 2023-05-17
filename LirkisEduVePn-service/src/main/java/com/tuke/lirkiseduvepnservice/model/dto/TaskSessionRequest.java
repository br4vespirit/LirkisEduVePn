package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object request that represents task session to create
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskSessionRequest {
    private Long taskId;
    private Long userId;
}
