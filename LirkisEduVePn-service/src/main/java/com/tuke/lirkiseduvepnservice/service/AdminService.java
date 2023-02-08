package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.Role;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.model.mapper.UserMapper;
import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserProfileDto updateUser(UserProfileDto dto) {
        User user = userRepository.findById(dto.getId()).orElse(null);
        if (user == null)
            return null;
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setNickname(dto.getNickname());
        user.setRole(Role.valueOf(dto.getRole()));

        userRepository.save(user);
        return userMapper.daoToDto(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
