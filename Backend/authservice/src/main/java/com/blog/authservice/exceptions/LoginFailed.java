package com.blog.authservice.exceptions;

public class LoginFailed extends RuntimeException {
    public LoginFailed(String error) {
        super((error));
    }
}