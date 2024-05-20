package com.blog.authservice.payload;

import com.blog.authservice.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    @NotBlank(message = "Please fill the username")
    private String username;
    @NotBlank(message = "Please fill the password")
    private String password;
    @NotBlank(message = "Please fill first name")
    private String firstName;
    @NotBlank(message = "Please fill last name")
    private String lastName;
    @NotNull(message = "Please select birthday")
    private Date birthday;
    @NotBlank(message = "Please fill your email")
    @Email(message = "Please correct your email")
    private String email;
    @NotBlank(message = "Please fill your phone number")
    private String phoneNumber;
    private String avatar = "";
    private Boolean active = true;
    private String noteActive = "New account";
    private Role role = Role.USER;
}
