package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object response that represents preview of Ефыл with all information about it
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TasksPreview {
    private Long id;
    private String name;
    private String description;
    private ScenarioPreviewResponse scenario;
    private ScenePreviewResponse scene;
    private List<Long> openSessions;
}
