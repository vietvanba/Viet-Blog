package org.vn.locationapi.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.vn.locationapi.entities.TimeUtils;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorEntity {
    private HttpStatus status;
    private String error;
    private String time = TimeUtils.convertTime();

}
