package com.blog.question.exceptions;

import com.blog.question.entities.TimeUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorEntity {
    private HttpStatus status;
    private String error;
    private String time = TimeUtils.convertTime();

}
