package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object response that represents preview of Scene with all information about it
 */
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
