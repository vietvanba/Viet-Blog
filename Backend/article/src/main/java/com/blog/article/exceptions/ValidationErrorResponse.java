package com.blog.article.exceptions;

import com.blog.article.entities.TimeUtils;
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
