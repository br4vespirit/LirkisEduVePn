package com.tuke.lirkiseduvepnservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

/**
 * Exception that throws when user tries to authenticate with non-existing email address
 */
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Email not exists")
public class EmailNotExistsException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public EmailNotExistsException(String message) {
        super(message);
    }
}