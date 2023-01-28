package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
