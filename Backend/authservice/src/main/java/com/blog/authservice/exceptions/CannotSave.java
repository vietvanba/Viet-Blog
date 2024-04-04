package com.blog.authservice.exceptions;

public class CannotSave extends RuntimeException{
    public CannotSave(String error){
        super(error);
    }
}
