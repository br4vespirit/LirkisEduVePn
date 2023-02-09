package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object that represents request with updated user profile data that sends from a client to a server after user submitted "update" button
 */
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
