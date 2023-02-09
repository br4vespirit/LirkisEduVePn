package com.tuke.lirkiseduvepnservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

/**
 * Exception that throws when user tries to authenticate with non-confirmed email address
 */
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Email not verified yet")
public class EmailNotVerifiedException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public EmailNotVerifiedException(String message) {
        super(message);
    }
}