package com.tuke.lirkiseduvepnservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

/**
 * Exception that throws when user tries to update hs email with already existing one
 */
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Email is already registered")
public class EmailRegisteredException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public EmailRegisteredException(String message) {
        super(message);
    }

}