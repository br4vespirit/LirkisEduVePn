package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.Group;
import com.tuke.lirkiseduvepnservice.model.dto.GroupDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class GroupMapper {

    public abstract GroupDto daoToDto(Group group);
}