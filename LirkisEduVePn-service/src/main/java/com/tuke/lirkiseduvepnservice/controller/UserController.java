package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.exception.EmailRegisteredException;
import com.tuke.lirkiseduvepnservice.exception.IncorrectCurrentPasswordException;
import com.tuke.lirkiseduvepnservice.exception.PasswordMatchesException;
import com.tuke.lirkiseduvepnservice.model.dto.ProfileUpdateRequest;
import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Rest endpoints for a user
 */
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {

    /**
     * Service that contains all necessary logic to perform actions with a user
     */
    private final UserService userService;


    /**
     * Endpoint that is used to get user profile within a JWT token
     *
     * @param servletRequest request which contains JWT token inside Authorization header
     * @return user profile data
     */
    @Operation(
            description = "Get user data by JWT token provided in HTTP request",
            summary = "Get user profile data",
            responses = {
                    @ApiResponse(
                            description = "Returns UserProfileDto object with all necessary data",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Returns null if user with provided JWT was not found",
                            responseCode = "400"
                    )
            }
    )
    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> get(HttpServletRequest servletRequest) {
        String jwtToken = servletRequest.getHeader("Authorization");
        UserProfileDto dto = userService.get(jwtToken);
        return new ResponseEntity<>(dto, dto == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }


    /**
     * Endpoint that is used to update user profile. This endpoint allows user to update his profile by himself
     *
     * @param request request with updated user profile data
     * @return updated user profile data
     * @throws EmailRegisteredException          when user changes his email and this email is already exists
     * @throws PasswordMatchesException          when user tries to change his password and entered new password and repeated new password do not matches
     * @throws IncorrectCurrentPasswordException when user tries to change his password, but he entered incorrectly his current password
     */
    @Operation(
            description = "Update user with ProfileUpdateRequest object which is passed through request body",
            summary = "Update user",
            responses = {
                    @ApiResponse(
                            description = "Returns updated UserProfileDto object",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Returns null if user with provided JWT was not found",
                            responseCode = "400"
                    )
            }
    )
    @PatchMapping("/profile")
    public ResponseEntity<UserProfileDto> update(@RequestBody ProfileUpdateRequest request) throws
            IncorrectCurrentPasswordException,
            EmailRegisteredException,
            PasswordMatchesException {
        UserProfileDto profile = userService.update(request);
        return new ResponseEntity<>(profile, profile == null ?
                HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    /**
     * Endpoint to retrieve all user from a database
     *
     * @return list of users profiles
     */
    @Operation(
            description = "Finds all users registered in the application",
            summary = "Find all users",
            responses = {
                    @ApiResponse(
                            description = "Returns list of registered users in application",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/all")
    public ResponseEntity<List<UserProfileDto>> findAll() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }
}
