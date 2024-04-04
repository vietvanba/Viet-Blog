package com.blog.authservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PersonalAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @ManyToOne
    @JoinColumn(name = "username")
    private Account account;
}
