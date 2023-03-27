package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScenePreviewResponse {
    private Long id;
    private String name;
    private String description;
    private byte[] photo;
    private String folderName;
}