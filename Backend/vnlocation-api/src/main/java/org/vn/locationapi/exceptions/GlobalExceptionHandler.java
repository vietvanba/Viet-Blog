package org.vn.locationapi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorEntity handleNotFoundException(NotFound e) {
        ErrorEntity error = new ErrorEntity();
        error.setError(e.getMessage());
        error.setStatus(HttpStatus.NOT_FOUND);
        return error;
    }
}
