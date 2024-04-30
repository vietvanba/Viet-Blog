package com.blog.authservice.controllers;

import com.blog.authservice.entities.Account;
import com.blog.authservice.services.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    AccountService service;
    @GetMapping
    public ResponseEntity<?> getDetails(HttpServletRequest request) {
        return ResponseEntity.ok(service.getAccountInfo(request));
    }
    @PatchMapping
    public ResponseEntity<?> updateAccount(@RequestBody Account account, HttpServletRequest request) {
        return ResponseEntity.ok(service.updateAccount(account,request));
    }
}