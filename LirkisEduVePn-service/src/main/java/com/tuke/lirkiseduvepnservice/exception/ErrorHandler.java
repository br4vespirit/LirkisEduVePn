package com.tuke.lirkiseduvepnservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Handler that is used to handle exceptions that has been thrown from a controllers and return a specific Http status to a user
 * instead of using default spring /error handler
 */
@ControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(PasswordMatchesException.class)
    public ResponseEntity<String> handlePasswordMismatchedException(PasswordMatchesException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(IncorrectCurrentPasswordException.class)
    public ResponseEntity<String> handleIncorrectCurrentPasswordException(IncorrectCurrentPasswordException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(EmailRegisteredException.class)
    public ResponseEntity<String> handleEmailRegisteredException(EmailRegisteredException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(EmailNotVerifiedException.class)
    public ResponseEntity<String> handleEmailRegisteredException(EmailNotVerifiedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(EmailNotExistsException.class)
    public ResponseEntity<String> handleEmailRegisteredException(EmailNotExistsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<String> handleEmailRegisteredException(IncorrectPasswordException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

    @ExceptionHandler(IncorrectFileExtensionException.class)
    public ResponseEntity<String> handleEmailRegisteredException(IncorrectFileExtensionException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(IncorrectLanguageExtensionException.class)
    public ResponseEntity<String> handleEmailRegisteredException(IncorrectLanguageExtensionException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(InstanceNotFoundException.class)
    public ResponseEntity<String> handleEmailRegisteredException(InstanceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(UnknownDirectoryException.class)
    public ResponseEntity<String> handleEmailRegisteredException(UnknownDirectoryException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(UnknownFileException.class)
    public ResponseEntity<String> handleEmailRegisteredException(UnknownFileException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
