package com.blog.mail.exceptions;

import com.blog.mail.entities.TimeUtils;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ValidationErrorResponse {
    private String status;
    private String field;
    private String error;
    private String time = TimeUtils.convertTime();

}
