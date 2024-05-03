package com.blog.article.exceptions;

public class LoginFailed extends RuntimeException {
    public LoginFailed(String error) {
        super((error));
    }
}