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

@Service
@RequiredArgsConstructor
public class TaskSessionService {

    private final TaskSessionRepository taskSessionRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Long startSession(TaskSessionRequest request) {
        TaskSession session = new TaskSession();
        Task task = taskRepository.findById(request.getTaskId()).orElseThrow();
        User user = userRepository.findById(request.getUserId()).orElseThrow();

        Timestamp now = new Timestamp(System.currentTimeMillis());
        session.setStartedAt(now);

        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(now.getTime());
        calendar.add(Calendar.HOUR_OF_DAY, 1);
        Timestamp expirationTime = new Timestamp(calendar.getTimeInMillis());
        session.setExpiredAt(expirationTime);

        session.setTask(task);
        session.setUser(user);

        taskSessionRepository.save(session);

        return session.getId();
    }

    public void finishSession(TaskSessionFinishRequest request) {
        TaskSession taskSession = taskSessionRepository.findById(request.getTaskSessionId()).orElseThrow();
        if (taskSession.getFinishedAt() != null) {
            throw new RuntimeException("err"); // create custom and say that session is already finished
        }
        taskSession.setFinishedAt(request.getFinishTime());
        taskSession.setSuccessful(request.isSuccessful());
        taskSessionRepository.save(taskSession);
    }

    public List<TaskSessionInfo> getInfoList(Long userId) {
        List<TaskSession> taskSessions = taskSessionRepository.findAllByUserId(userId);
        return taskSessions
                .stream()
                .map(t -> new TaskSessionInfo(t.getId(), t.getTask().getName(),
                        t.getFinishedAt(), t.getStartedAt(), t.isSuccessful()))
                .toList();
    }
}
