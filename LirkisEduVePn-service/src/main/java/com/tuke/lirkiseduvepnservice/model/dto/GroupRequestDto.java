package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object request that represents extended GroupDto with list of tasks id that are allowed for the current group
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupRequestDto extends GroupDto {
    private List<Long> tasks;
}
