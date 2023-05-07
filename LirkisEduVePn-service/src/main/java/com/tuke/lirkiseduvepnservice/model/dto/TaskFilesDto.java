package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object that represents response with task files, as language file and pnml/cpn file
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskFilesDto {
    private byte[] pnmlFile;
    private byte[] languageFile;
}
