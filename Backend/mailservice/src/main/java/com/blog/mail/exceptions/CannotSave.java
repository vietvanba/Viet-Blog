package com.blog.mail.exceptions;

public class CannotSave extends RuntimeException{
    public CannotSave(String err){
        super(err);
    }
}
