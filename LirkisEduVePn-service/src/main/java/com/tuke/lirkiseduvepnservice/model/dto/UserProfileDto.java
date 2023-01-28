package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String nickname;
    private String email;
    private String role;
}
