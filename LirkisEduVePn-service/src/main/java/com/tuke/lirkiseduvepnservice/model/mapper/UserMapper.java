package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * The UserMapper is used to map User entity and related DTO objects between each other
 * It contains several mapping methods that are used by the Spring Framework to automatically map objects based
 * on their names.
 */
@Mapper(componentModel = "spring")
public abstract class UserMapper {

    /**
     * Method to map between
     *
     * @param user DAO of a user
     * @return UserProfile DTO of a user
     */
    @Mapping(target = "role", expression = "java(user.getRole().name())")
    public abstract UserProfileDto daoToDto(User user);
}