package com.tuke.lirkiseduvepnservice.model.mapper;

import com.tuke.lirkiseduvepnservice.model.dao.Group;
import com.tuke.lirkiseduvepnservice.model.dao.Task;
import com.tuke.lirkiseduvepnservice.model.dto.GroupDto;
import com.tuke.lirkiseduvepnservice.model.dto.GroupWithTasksDto;
import com.tuke.lirkiseduvepnservice.model.dto.TaskNames;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class GroupMapper {

    public abstract GroupDto daoToDto(Group group);


    @Mapping(target = "tasks", source = "tasks", qualifiedByName = "mapTasks")
    public abstract GroupWithTasksDto daoToDtoWithGroups(Group group);

    @Named("mapTasks")
    protected List<TaskNames> mapLanguages(List<Task> tasks) {
        return tasks.stream()
                .map(task -> new TaskNames(task.getId(), task.getName()))
                .toList();
    }
}