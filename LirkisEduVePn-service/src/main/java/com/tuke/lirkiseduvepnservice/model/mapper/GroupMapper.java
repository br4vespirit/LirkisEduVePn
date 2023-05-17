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

/**
 * The GroupMapper is used to map Group entity and related DTO objects between each other
 * It contains several mapping methods that are used by the Spring Framework to automatically map objects based
 * on their names.
 */
@Mapper(componentModel = "spring")
public abstract class GroupMapper {

    /**
     * Maps a Group entity to a GroupDto object
     *
     * @param group The Group entity to map to a GroupDto object.
     * @return A GroupDto object representing the provided Group entity
     */
    public abstract GroupDto daoToDto(Group group);

    /**
     * Maps a Group entity to a GroupWithTasksDto object
     *
     * @param group The Group entity to map to a GroupWithTasksDto object.
     * @return A GroupWithTasksDto object representing the provided Group entity
     */
    @Mapping(target = "tasks", source = "tasks", qualifiedByName = "mapTasks")
    public abstract GroupWithTasksDto daoToDtoWithGroups(Group group);

    /**
     * Method to map Group tasks field to GroupWithTasksDto tasks field
     *
     * @param tasks Task entity tasks field
     * @return GroupWithTasksDto object tasks field
     */
    @Named("mapTasks")
    protected List<TaskNames> mapLanguages(List<Task> tasks) {
        return tasks.stream()
                .map(task -> new TaskNames(task.getId(), task.getName()))
                .toList();
    }
}