package com.blog.authservice;

import com.blog.authservice.enums.Role;
import com.blog.authservice.payload.RegisterRequest;
import com.blog.authservice.repositories.AccountRepository;
import com.blog.authservice.services.AuthService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Calendar;
import java.util.Date;

@SpringBootApplication
public class AuthserviceApplication {
    @Value("${admin.username}")
    private String username;
    @Value("${admin.passsword}")
    private String password;
    public static void main(String[] args) {
        SpringApplication.run(AuthserviceApplication.class, args);
    }

    @Autowired
    AuthService service;
    @Autowired
    AccountRepository repository;

    @PostConstruct
    public void init() {
        if (!repository.existsByUsername("admin")) {
            service.register(RegisterRequest.builder()
                    .username(username)
                    .password(password)
                    .firstName("admin")
                    .lastName("admin")
                    .birthday(new Date(99, Calendar.SEPTEMBER, 4))
                    .email("baviet19@gmail.com")
                    .phoneNumber("0332796818")
                    .active(true)
                    .avatar("")
                    .noteActive("admin")
                    .role(Role.ADMIN).build());
        }
    }
}
