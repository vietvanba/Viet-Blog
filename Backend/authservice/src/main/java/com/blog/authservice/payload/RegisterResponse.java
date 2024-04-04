package com.blog.authservice.payload;

import com.blog.authservice.enums.Role;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponse {
    private String username;
    private String firstName;
    private String password;
    private String lastName;
    private Date birthday;
    private String avatar;
    private String email;
    private String phoneNumber;
    private Boolean active;
    private String noteActive;
    private Role role;
}
