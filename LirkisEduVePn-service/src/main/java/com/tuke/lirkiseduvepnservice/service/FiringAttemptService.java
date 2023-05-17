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

/**
 * FiringAttemptService class contains methods to manage firing attempts
 */
@Service
@RequiredArgsConstructor
public class FiringAttemptService {

    /**
     * Repository for working with the "firing_attempt" table in the database
     */
    private final FiringAttemptRepository firingAttemptRepository;

    /**
     * Repository for working with the "task_session" table in the database
     */
    private final TaskSessionRepository taskSessionRepository;

    /**
     * This method is used to save a FiringAttempt entity to the database.
     * It creates a new FiringAttempt object, sets its fields based on the provided FiringAttemptRequest
     * object, and saves it to the repository.
     *
     * @param request A FiringAttemptRequest object containing the details of the firing attempt to save.
     */
    public void saveTransition(FiringAttemptRequest request) {
        FiringAttempt firingAttempt = new FiringAttempt();
        TaskSession taskSession = taskSessionRepository
                .findById(request.getTaskSessionId())
                .orElseThrow();

        if (taskSession.getFinishedAt() != null) {
            throw new RuntimeException("err");
        }

        firingAttempt.setAction(request.getAction());
        firingAttempt.setActionDate(request.getActionDate());
        firingAttempt.setSuccessful(request.isSuccessful());
        firingAttempt.setTaskSession(taskSession);
        firingAttempt.setActionFound(request.isActionFound());
        firingAttempt.setActionTargets(request.getActionTargets());

        firingAttemptRepository.save(firingAttempt);
    }

    /**
     * The getAll method is used to retrieve a List of all FiringAttempt entities associated with the specified task session ID.
     *
     * @param sessionId A Long representing the ID of the task session to retrieve firing attempts for.
     * @return A List of FiringAttemptResponse objects representing all firing attempts associated with the specified task session ID.
     */
    public List<FiringAttemptResponse> getAll(Long sessionId) {
        if (sessionId == null) {
            throw new RuntimeException("err"); // create custom error
        }
        return firingAttemptRepository.findBySessionIdAndTrue(sessionId)
                .stream()
                .map(f -> new FiringAttemptResponse(f.getAction(), f.isActionFound(),
                        f.isSuccessful(), f.getActionTargets(), f.getActionDate()))
                .toList();
    }
}
