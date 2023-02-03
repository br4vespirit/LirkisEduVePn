package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.model.mapper.UserMapper;
import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserProfileDto get(String jwt) {
        if (jwt == null)
            return null;
        String email = jwtService.extractEmail(jwt.substring(7));
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null)
            return null;
        return userMapper.daoToDto(user);
    }

    public void enableUser(String email) {
        userRepository.enableUser(email);
    }
}
