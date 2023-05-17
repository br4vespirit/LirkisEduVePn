package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object that represents response of task id and task name
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskNames {
    private Long id;
    private String name;
}
