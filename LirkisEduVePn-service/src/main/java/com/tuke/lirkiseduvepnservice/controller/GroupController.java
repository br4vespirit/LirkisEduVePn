package com.tuke.lirkiseduvepnservice.controller;

import com.tuke.lirkiseduvepnservice.model.dto.GroupDto;
import com.tuke.lirkiseduvepnservice.model.dto.GroupRequestDto;
import com.tuke.lirkiseduvepnservice.model.dto.GroupWithTasksDto;
import com.tuke.lirkiseduvepnservice.service.GroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/group")
@Tag(name = "Group")
public class GroupController {

    private final GroupService groupService;

    @Operation(
            description = "Get a list of all groups",
            summary = "Get all groups",
            responses = {
                    @ApiResponse(
                            description = "Returns list of GroupDto objects",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<List<GroupDto>> findAll() {
        return new ResponseEntity<>(groupService.findAll(), HttpStatus.OK);
    }

    @Operation(
            description = "Get a list of all groups with list of allowed tasks to the current group in addition",
            summary = "Get list of groups with allowed tasks",
            responses = {
                    @ApiResponse(
                            description = "Returns list of GroupWithTasksDto objects",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/with-tasks")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<List<GroupWithTasksDto>> findAllWithTasks() {
        return new ResponseEntity<>(groupService.findAllWithTasks(), HttpStatus.OK);
    }

    @Operation(
            description = "Endpoint to create a new group with given GroupRequestDto object",
            summary = "Create a new group",
            responses = {
                    @ApiResponse(
                            description = "Returns GroupWithTasksDto object after creation",
                            responseCode = "200"
                    )
            }
    )
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<GroupWithTasksDto> create(@RequestBody GroupRequestDto request) {
        GroupWithTasksDto group = groupService.create(request);
        return new ResponseEntity<>(group, HttpStatus.OK);
    }

    @Operation(
            description = "Endpoint to update a group with GroupRequestDto object",
            summary = "Update group",
            responses = {
                    @ApiResponse(
                            description = "Returns updated group as GroupWithTasksDto object",
                            responseCode = "200"
                    )
            }
    )
    @PatchMapping
    public ResponseEntity<GroupWithTasksDto> update(@RequestBody GroupRequestDto request) {
        GroupWithTasksDto dto = groupService.update(request);
        return new ResponseEntity<>(dto, dto == null ?
                HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @Operation(
            description = "Delete group by group id",
            summary = "Delete group",
            responses = {
                    @ApiResponse(
                            description = "Returns nothing",
                            responseCode = "200"
                    )
            }
    )
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
