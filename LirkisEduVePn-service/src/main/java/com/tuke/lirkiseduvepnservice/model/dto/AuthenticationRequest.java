package com.tuke.lirkiseduvepnservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object that represents Authentication request that sends from a client to a server after user submitted "login" button
 */
@Data
@AllArgsConstructor @NoArgsConstructor
public class AuthenticationRequest {

    private String email;
    private String password;
}
