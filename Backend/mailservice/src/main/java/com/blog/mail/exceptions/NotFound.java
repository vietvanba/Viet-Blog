package com.blog.mail.exceptions;

public class NotFound extends RuntimeException{
    public NotFound(String err){
        super(err);
    }
}
