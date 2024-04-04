package com.blog.authservice.entities;

import com.blog.authservice.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Account implements UserDetails {
    @Id
    private String username;
    private String password;
    private Date createdTime;
    private String firstName;
    private String lastName;
    private Date birthday;
    private String avatar;
    @OneToMany(mappedBy = "account")
    private List<PersonalAddress> personalAddress;
    @Email(message = "Please correct your email")
    private String email;
    private String phoneNumber;
    private Boolean active;
    private String noteActive;
    @Enumerated
    private Role role;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
