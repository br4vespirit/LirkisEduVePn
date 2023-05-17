package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

/**
 * Data Transfer Object request that represents Scenario to create
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScenarioRequest {
    private String name;
    private String description;
    private MultipartFile file;
}
