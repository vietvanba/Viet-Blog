package com.blog.authservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(LoginFailed.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorEntity handleLoginFailedException(LoginFailed e)
    {
        ErrorEntity error = new ErrorEntity();
        error.setError(e.getMessage());
        error.setStatus(HttpStatus.UNAUTHORIZED);
        return error;
    }
    @ExceptionHandler(NotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorEntity handleNotFoundException(NotFound e)
    {
        ErrorEntity error = new ErrorEntity();
        error.setError(e.getMessage());
        error.setStatus(HttpStatus.NOT_FOUND);
        return error;
    }
    @ExceptionHandler(CannotSave.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorEntity handleCannotSaveException(CannotSave e)
    {
        ErrorEntity error = new ErrorEntity();
        error.setError(e.getMessage());
        error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        return error;
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public List<ValidationErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<ValidationErrorResponse> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            ValidationErrorResponse response = new ValidationErrorResponse();
            response.setField(((FieldError) error).getField());
            response.setError(error.getDefaultMessage());
            response.setStatus(String.valueOf(ex.getStatusCode().value()));
            errors.add(response);
        });
        return errors;
    }
}
