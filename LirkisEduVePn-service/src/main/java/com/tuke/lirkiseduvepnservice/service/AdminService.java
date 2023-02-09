package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.Role;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import com.tuke.lirkiseduvepnservice.model.mapper.UserMapper;
import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service layer class to implement business logic of an admin performance in his dashboard
 */
@Service
@RequiredArgsConstructor
public class AdminService {

    /**
     * JPA repository for a user management
     */
    private final UserRepository userRepository;

    /**
     * Mapper to map between DAO and DTO users
     */
    private final UserMapper userMapper;

    /**
     * Method to update user profile by admin, not by user
     *
     * @param dto request that represents updated user profile
     * @return updated user profile to a client
     */
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

    /**
     * Method to delete user from a database. Can be performed only by admin
     *
     * @param id user id which will be deleted
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
