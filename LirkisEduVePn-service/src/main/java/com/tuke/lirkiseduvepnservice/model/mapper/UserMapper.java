package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.UserProfileDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    @Mapping(target = "role", expression = "java(user.getRole().name())")
    public abstract UserProfileDto daoToDto(User user);
}