package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.exception.EmailRegisteredException;
import com.tuke.lirkiseduvepnservice.exception.IncorrectCurrentPasswordException;
import com.tuke.lirkiseduvepnservice.exception.PasswordMatchesException;
import com.tuke.lirkiseduvepnservice.model.dto.ProfileUpdateRequest;
import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> get(HttpServletRequest servletRequest) {
        String jwtToken = servletRequest.getHeader("Authorization");
        UserProfileDto dto = userService.get(jwtToken);
        return new ResponseEntity<>(dto, dto == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    // TODO if necessary add @Valid to @RequestBody
    @PatchMapping("/profile")
    public ResponseEntity<UserProfileDto> update(@RequestBody ProfileUpdateRequest request) throws
            IncorrectCurrentPasswordException,
            EmailRegisteredException,
            PasswordMatchesException {
        UserProfileDto profile = userService.update(request);
        return new ResponseEntity<>(profile, profile == null ?
                HttpStatus.NOT_FOUND : HttpStatus.OK);
    }
}
