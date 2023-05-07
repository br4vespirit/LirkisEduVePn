package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object that represents extended GroupDto with list of TaskNames objects that are allowed for the current group
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupWithTasksDto extends GroupDto {
    private List<TaskNames> tasks;
}