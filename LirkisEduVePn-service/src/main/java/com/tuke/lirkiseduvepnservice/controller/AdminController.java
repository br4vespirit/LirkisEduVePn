package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// TODO разрешить ендпоинт только для админ роли
@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PatchMapping("/users")
    public ResponseEntity<UserProfileDto> update(@RequestBody UserProfileDto dto) {
        UserProfileDto profile = adminService.updateUser(dto);
        return new ResponseEntity<>(profile, profile == null ?
                HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adminService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}