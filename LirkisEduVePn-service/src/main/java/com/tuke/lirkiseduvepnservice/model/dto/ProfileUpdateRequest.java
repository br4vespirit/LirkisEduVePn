package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUpdateRequest {
    private Long id;
    private String nickname;
    private String firstname;
    private String lastname;
    private String email;
    private String currentPassword;
    private String newPassword;
    private String repeatNewPassword;
}
