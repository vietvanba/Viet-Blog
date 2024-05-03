package com.blog.article.exceptions;

public class CannotSave extends RuntimeException{
    public CannotSave(String error){
        super(error);
    }
}
