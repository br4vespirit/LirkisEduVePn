package com.tuke.lirkiseduvepnservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Incorrect extension")
public class IncorrectFileExtensionException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public IncorrectFileExtensionException(String message) {
        super(message);
    }
}