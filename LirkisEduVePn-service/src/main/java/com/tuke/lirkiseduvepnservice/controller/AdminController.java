package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Rest controller for admin dashboard
 */
// TODO разрешить ендпоинт только для админ роли
@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class AdminController {

    /**
     * Service that provides methods to perform some actions only for admin
     */
    private final AdminService adminService;


    /**
     * Endpoint that is used to update a specific user. User will be updated not by himself, but by admin
     *
     * @param dto request with update user
     * @return updates user
     */
    @PatchMapping("/users")
    public ResponseEntity<UserProfileDto> update(@RequestBody UserProfileDto dto) {
        UserProfileDto profile = adminService.updateUser(dto);
        return new ResponseEntity<>(profile, profile == null ?
                HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }


    /**
     * Endpoint that is used to delete user from a database via his id
     *
     * @param id user identifier in database
     * @return http status OK
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adminService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}