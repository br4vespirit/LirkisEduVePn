package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.dao.Task;
import com.tuke.lirkiseduvepnservice.model.dao.TaskSession;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionFinishRequest;
import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionInfo;
import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionRequest;
import com.tuke.lirkiseduvepnservice.repository.TaskRepository;
import com.tuke.lirkiseduvepnservice.repository.TaskSessionRepository;
import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

/**
 * TaskSessionService class contains methods to manage task sessions
 */
@Service
@RequiredArgsConstructor
public class TaskSessionService {

    /**
     * Repository for working with the "task_session" table in the database
     */
    private final TaskSessionRepository taskSessionRepository;

    /**
     * Repository for working with the "task" table in the database
     */
    private final TaskRepository taskRepository;

    /**
     * Repository for working with the "user" table in the database
     */
    private final UserRepository userRepository;


    /**
     * Creates (starts) a new task session
     *
     * @param request object that contains all necessary data about session to create
     * @return id of created session
     */
    public Long startSession(TaskSessionRequest request) {
        TaskSession session = new TaskSession();
        Task task = taskRepository.findById(request.getTaskId()).orElseThrow();
        User user = userRepository.findById(request.getUserId()).orElseThrow();

        Timestamp now = new Timestamp(System.currentTimeMillis());
        session.setStartedAt(now);

        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(now.getTime());
        calendar.add(Calendar.DAY_OF_MONTH, 2);
        Timestamp expirationTime = new Timestamp(calendar.getTimeInMillis());
        session.setExpiredAt(expirationTime);

        session.setTask(task);
        session.setUser(user);

        taskSessionRepository.save(session);

        return session.getId();
    }

    /**
     * Finishes a task session
     *
     * @param request object that contains all necessary data about session to finish
     */
    public void finishSession(TaskSessionFinishRequest request) {
        TaskSession taskSession = taskSessionRepository.findById(request.getTaskSessionId()).orElseThrow();
        if (taskSession.getFinishedAt() != null) {
            throw new RuntimeException("err"); // create custom and say that session is already finished
        }
        taskSession.setFinishedAt(request.getFinishTime());
        taskSession.setSuccessful(request.isSuccessful());
        taskSessionRepository.save(taskSession);
    }

    /**
     * Finds all sessions that belong to the same user
     *
     * @param userId id of a user
     * @return list of sessions info
     */
    public List<TaskSessionInfo> getInfoList(Long userId) {
        List<TaskSession> taskSessions = taskSessionRepository.findAllByUserId(userId);
        return taskSessions
                .stream()
                .map(t -> new TaskSessionInfo(t.getId(), t.getTask().getName(),
                        t.getFinishedAt(), t.getStartedAt(), t.isSuccessful(),
                        t.getUser().getFirstname() + " " + t.getUser().getLastname()))
                .toList();
    }

    /**
     * Finds all sessions that belong to the same group
     *
     * @param groupId id of a group
     * @return list of sessions info
     */
    public List<TaskSessionInfo> getInfoListByGroup(Long groupId) {
        List<TaskSession> taskSessions = taskSessionRepository.findAllByGroupId(groupId);
        return taskSessions
                .stream()
                .map(t -> new TaskSessionInfo(t.getId(), t.getTask().getName(),
                        t.getFinishedAt(), t.getStartedAt(), t.isSuccessful(),
                        t.getUser().getFirstname() + " " + t.getUser().getLastname()))
                .toList();
    }
}
