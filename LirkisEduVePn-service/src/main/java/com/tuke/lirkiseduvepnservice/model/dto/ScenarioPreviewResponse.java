package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScenarioPreviewResponse {
    private Long id;
    private String name;
    private String description;
    private List<String> languages;
    private List<byte[]> photos;
}