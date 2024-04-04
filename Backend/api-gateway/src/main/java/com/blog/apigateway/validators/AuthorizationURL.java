package com.blog.apigateway.validators;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpMethod;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthorizationURL {
    private String url;
    private HttpMethod method;
    private String role;
}
