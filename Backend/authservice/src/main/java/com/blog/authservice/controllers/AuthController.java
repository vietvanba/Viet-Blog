package com.blog.authservice.controllers;

import com.blog.authservice.payload.AuthenticationRequest;
import com.blog.authservice.payload.RegisterRequest;
import com.blog.authservice.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        LOGGER.info("Create new user. Username: " + request.getUsername() + "Email: " + request.getEmail());
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        LOGGER.info("Login process. Username: " + request.getUsername());
        return ResponseEntity.ok(service.login(request));
    }
}
