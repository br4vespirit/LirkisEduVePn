package com.tuke.lirkiseduvepnservice.service;

import com.tuke.lirkiseduvepnservice.model.dao.FiringAttempt;
import com.tuke.lirkiseduvepnservice.model.dao.TaskSession;
import com.tuke.lirkiseduvepnservice.model.dto.FiringAttemptRequest;
import com.tuke.lirkiseduvepnservice.model.dto.FiringAttemptResponse;
import com.tuke.lirkiseduvepnservice.repository.FiringAttemptRepository;
import com.tuke.lirkiseduvepnservice.repository.TaskSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FiringAttemptService {

    private final FiringAttemptRepository firingAttemptRepository;
    private final TaskSessionRepository taskSessionRepository;

    public void saveTransition(FiringAttemptRequest request) {
        FiringAttempt firingAttempt = new FiringAttempt();
        TaskSession taskSession = taskSessionRepository
                .findById(request.getTaskSessionId())
                .orElseThrow();

        if (taskSession.getFinishedAt() != null) {
            // create custom exc which indicates that session is already finished
            throw new RuntimeException("err");
        }

        firingAttempt.setAction(request.getAction());
        firingAttempt.setActionDate(request.getActionDate());
        firingAttempt.setSuccessful(request.isSuccessful());
        firingAttempt.setTaskSession(taskSession);

        firingAttemptRepository.save(firingAttempt);
    }

    public List<FiringAttemptResponse> getAll(Long sessionId) {
        if (sessionId == null) {
            throw new RuntimeException("err"); // create custom error
        }
        return firingAttemptRepository.findBySessionIdAndTrue(sessionId)
                .stream()
                .map(f -> new FiringAttemptResponse(f.getAction()))
                .toList();
    }
}
