package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object request that represents task description file to find as id of task and language of file
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskFilesRequest {
    private Long taskId;
    private String language;
}