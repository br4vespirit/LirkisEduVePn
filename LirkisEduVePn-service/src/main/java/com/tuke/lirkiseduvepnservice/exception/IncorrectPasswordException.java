package com.tuke.lirkiseduvepnservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

/**
 * Exception that throws when user tries to authenticate with incorrect password
 */
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Password is incorrect")
public class IncorrectPasswordException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public IncorrectPasswordException(String message) {
        super(message);
    }
}