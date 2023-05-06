package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Rest controller for admin dashboard
 */
@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@Tag(name = "Admin")
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
    @Operation(
            description = "Endpoint to update a user profile with UserProfileDto object",
            summary = "Update a user",
            responses = {
                    @ApiResponse(
                            description = "Returns updated user as UserProfileDto object",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Returns null",
                            responseCode = "400"
                    )
            }
    )
    @PatchMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
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
    @Operation(
            description = "Endpoint to delete a user by user id",
            summary = "Delete a user",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing",
                            responseCode = "200"
                    )
            }
    )
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adminService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}