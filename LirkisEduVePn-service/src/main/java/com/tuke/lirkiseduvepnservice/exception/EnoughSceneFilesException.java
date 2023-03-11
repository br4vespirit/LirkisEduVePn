package com.tuke.lirkiseduvepnservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Enough scene files")
public class EnoughSceneFilesException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public EnoughSceneFilesException(String message) {
        super(message);
    }
}