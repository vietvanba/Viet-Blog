package com.blog.mail.exceptions;

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

    @ExceptionHandler(NotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorEntity handleNotFoundException(NotFound ex) {
        ErrorEntity error = new ErrorEntity();
        error.setStatus(HttpStatus.NOT_FOUND);
        error.setError(ex.getMessage());
        return error;
    }
    @ExceptionHandler(NotMatch.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorEntity handleNotMatchException(NotMatch ex) {
        ErrorEntity error = new ErrorEntity();
        error.setStatus(HttpStatus.NOT_FOUND);
        error.setError(ex.getMessage());
        return error;
    }
}
