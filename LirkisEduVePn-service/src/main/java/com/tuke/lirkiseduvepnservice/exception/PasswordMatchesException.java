package com.tuke.lirkiseduvepnservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Passwords not match each other")
public class PasswordMatchesException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public PasswordMatchesException(String message) {
        super(message);
    }
}