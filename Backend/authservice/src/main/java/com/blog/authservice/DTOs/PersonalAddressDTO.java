package com.blog.authservice.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalAddressDTO {
    private Long id;
    private String provinceId;
    private String province;
    private String districtId;
    private String district;
    private String wardId;
    private String ward;
    private String detailAddress;
    private String fullAddress;
    private boolean active;
    private Date createdTime;
}