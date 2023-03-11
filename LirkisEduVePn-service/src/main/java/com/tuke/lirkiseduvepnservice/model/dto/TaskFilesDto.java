package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskFilesDto {
    private byte[] htmlFile;
    private byte[] tsFile;
    private byte[] specTsFile;
    private byte[] pnmlFile;
    private byte[] languageFile;
}
