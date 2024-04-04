package org.vn.locationapi.exceptions;

public class NotFound extends RuntimeException {
    public NotFound(String err) {
        super(err);
    }
}