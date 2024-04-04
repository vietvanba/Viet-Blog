package com.blog.authservice.exceptions;

public class NotFound extends RuntimeException {
    public NotFound(String error) {
        super(error);
    }
}