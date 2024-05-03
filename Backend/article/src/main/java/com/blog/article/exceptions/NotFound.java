package com.blog.article.exceptions;

public class NotFound extends RuntimeException {
    public NotFound(String error) {
        super(error);
    }
}