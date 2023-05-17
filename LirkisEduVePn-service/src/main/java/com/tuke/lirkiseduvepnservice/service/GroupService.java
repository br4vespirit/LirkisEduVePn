package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.dao.Group;
import com.tuke.lirkiseduvepnservice.model.dao.Task;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.GroupDto;
import com.tuke.lirkiseduvepnservice.model.dto.GroupRequestDto;
import com.tuke.lirkiseduvepnservice.model.dto.GroupWithTasksDto;
import com.tuke.lirkiseduvepnservice.model.mapper.GroupMapper;
import com.tuke.lirkiseduvepnservice.repository.GroupRepository;
import com.tuke.lirkiseduvepnservice.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * ScenarioService class contains methods to manage groups
 */
@Service
@RequiredArgsConstructor
public class GroupService {

    /**
     * Repository for working with the "group" table in the database
     */
    private final GroupRepository groupRepository;

    /**
     * Mapper to map all Group data transfer objects and Group entity between each other
     */
    private final GroupMapper groupMapper;

    /**
     * Repository for working with the "task" table in the database
     */
    private final TaskRepository taskRepository;

    /**
     * Method that finds all groups and return them as list of groups
     *
     * @return list of GroupDto objects
     */
    public List<GroupDto> findAll() {
        return groupRepository.findAll()
                .stream()
                .map(groupMapper::daoToDto)
                .toList();
    }

    /**
     * Method that finds all groups and return them as list of groups with tasks objects
     *
     * @return list of GroupWithTasksDto objects
     */
    public List<GroupWithTasksDto> findAllWithTasks() {
        return groupRepository.findAll()
                .stream()
                .map(groupMapper::daoToDtoWithGroups)
                .toList();
    }

    /**
     * Method that create a new group with GroupRequestDto object
     *
     * @param request GroupRequestDto object that contains information about group to create
     * @return created group as GroupWithTasksDto object
     */
    public GroupWithTasksDto create(GroupRequestDto request) {
        Group group = new Group();
        group.setName(request.getName());

        List<Task> tasks = new ArrayList<>();
        if (request.getTasks() != null) {
            for (Task task : taskRepository.findAll()) {
                if (request.getTasks().contains(task.getId())) {
                    task.getGroups().add(group);
                    tasks.add(task);
                }
            }
        }
        group.setTasks(tasks);

        groupRepository.save(group);
        return groupMapper.daoToDtoWithGroups(group);
    }

    /**
     * Method that updates existing group with GroupRequestDto object
     *
     * @param dto GroupRequestDto object that contains information about group to update
     * @return updated group as GroupWithTasksDto object
     */
    public GroupWithTasksDto update(GroupRequestDto dto) {
        Group group = groupRepository.findById(dto.getId()).orElseThrow();

        group.setName(dto.getName());
        for (Task task : group.getTasks()) {
            task.getGroups().remove(group);
        }
        group.setTasks(null);

        List<Task> tasks = taskRepository.findAllById(dto.getTasks());
        for (Task task : tasks) {
            task.getGroups().add(group);
        }
        group.setTasks(tasks);

        groupRepository.save(group);
        return groupMapper.daoToDtoWithGroups(group);
    }

    /**
     * Method that deletes a group by provided group id
     *
     * @param id group id
     */
    public void deleteGroup(Long id) {
        Group group = groupRepository.findById(id).orElseThrow();
        for (Task task : group.getTasks()) {
            task.getGroups().remove(group);
        }
        for (User user : group.getUsers()) {
            user.getGroups().remove(group);
        }
        groupRepository.deleteById(id);
    }
}
