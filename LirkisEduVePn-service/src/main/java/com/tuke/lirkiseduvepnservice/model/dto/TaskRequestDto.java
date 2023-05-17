package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object request that represents task to create
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequestDto {
    private String name;
    private String description;
    private Long scenarioId;
    private Long sceneId;
}
