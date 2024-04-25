package com.blog.authservice.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private String username;
    private String firstName;
    private String lastName;
    private Date birthday;
    private String avatar;
    private String email;
    private String phoneNumber;
    private Boolean active;
    private List<PersonalAddressDTO> personalAddressDTOS;
}