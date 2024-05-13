package com.blog.dictionary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = NotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public List<ErrorEntity> NotFound(NotFound ex) {
        List<ErrorEntity> errors = new ArrayList<>();
        ErrorEntity error = new ErrorEntity();
        error.setError(ex.getMessage());
        error.setStatus(HttpStatus.NOT_FOUND);
        errors.add(error);
        return errors;
    }
}
