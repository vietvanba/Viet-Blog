package com.blog.mail.exceptions;

import com.blog.mail.entities.TimeUtils;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.SimpleTimeZone;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorEntity {
    private HttpStatus status;
    private String error;
    private String time = TimeUtils.convertTime();

}
