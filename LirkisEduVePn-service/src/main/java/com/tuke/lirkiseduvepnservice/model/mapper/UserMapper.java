package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Implementation of a mapper between DAO and DTO users using mapstruct library
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