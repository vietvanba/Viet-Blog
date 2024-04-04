package com.blog.authservice.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public class AuthenticationResponse {
    @JsonProperty("username")
    private String username;
    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;
    @JsonProperty("email")
    private String email;
    @JsonProperty("role")
    private String role;
    @JsonProperty("access_token")
    private String accessToken;
}
