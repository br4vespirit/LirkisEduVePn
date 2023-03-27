package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.dao.Task;
import com.tuke.lirkiseduvepnservice.model.dao.TaskSession;
import com.tuke.lirkiseduvepnservice.model.dao.User;
import com.tuke.lirkiseduvepnservice.model.dto.TaskSessionRequest;
import com.tuke.lirkiseduvepnservice.repository.TaskRepository;
import com.tuke.lirkiseduvepnservice.repository.TaskSessionRepository;
import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;

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
}
