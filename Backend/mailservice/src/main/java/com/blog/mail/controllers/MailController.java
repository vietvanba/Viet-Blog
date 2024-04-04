package com.blog.mail.controllers;

import com.blog.mail.entities.Mail;
import com.blog.mail.services.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail")
@Validated
public class MailController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MailController.class);
    @Autowired
    MailService mailService;

    @PostMapping
    public ResponseEntity<?> createMail(@Validated @RequestBody Mail mail) {
        LOGGER.info("Create mail: " + mail.getAddress());
        return ResponseEntity.ok(mailService.saveEmail(mail));
    }

    @GetMapping
    public ResponseEntity<?> getAllMail(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        LOGGER.info("Get All mail. Page number: " + pageNo + " Page size: " + pageSize);
        return ResponseEntity.ok(mailService.getAllMail(pageNo, pageSize));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatus(@Validated @RequestBody Mail mail, @PathVariable Integer id) {
        LOGGER.info("Update status for the email with ID: " + id);
        return ResponseEntity.ok(mailService.updateStatus(id, mail));
    }
}
