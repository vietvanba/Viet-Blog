package com.blog.authservice.payload;

import com.blog.authservice.enums.Role;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Date birthday;
    private String email;
    private String phoneNumber;
    private String avatar="";
    private Boolean active=true;
    private String noteActive="New account";
    private Role role=Role.USER;
}
