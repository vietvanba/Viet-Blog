package com.blog.authservice.controllers;

import com.blog.authservice.services.AccountService;
import com.blog.authservice.services.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    AccountService service;
    @GetMapping
    public ResponseEntity<?> getDetails(HttpServletRequest request) {
        return ResponseEntity.ok(service.getAccountInfo(request));
    }
}