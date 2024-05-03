package com.blog.article.exceptions;

import jakarta.validation.ConstraintViolationException;
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
    @ExceptionHandler(NotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public List<ErrorEntity> handleNotFoundException(NotFound e)
    {
        List<ErrorEntity> errors = new ArrayList<>();
        ErrorEntity error = new ErrorEntity();
        error.setError(e.getMessage());
        error.setStatus(HttpStatus.NOT_FOUND);
        errors.add(error);
        return errors;
    }
    @ExceptionHandler(CannotSave.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public List<ErrorEntity> handleCannotSaveException(CannotSave e)
    {
        List<ErrorEntity> errors = new ArrayList<>();
        ErrorEntity error = new ErrorEntity();
        error.setError(e.getMessage());
        error.setStatus(HttpStatus.BAD_REQUEST);
        errors.add(error);
        return errors;
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
