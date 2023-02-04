package com.tuke.lirkiseduvepnservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Email is already registered")
public class IncorrectCurrentPasswordException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public IncorrectCurrentPasswordException(String message) {
        super(message);
    }

}