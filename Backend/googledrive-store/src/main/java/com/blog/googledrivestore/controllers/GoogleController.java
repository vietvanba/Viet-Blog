package com.blog.googledrivestore.controllers;

import com.blog.googledrivestore.services.GoogleDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/google")
public class GoogleController {
    @Autowired
    GoogleDriveService service;
    @GetMapping("dictionary/{id}")
    public ResponseEntity<?> getDictionaryById(@PathVariable(name = "id") String id) {
        return ResponseEntity.ok(service.getDictionaryById(id));
    }
    @GetMapping("file/{id}")
    public ResponseEntity<?> getFileById(@PathVariable(name = "id") String id) throws IOException {
        return ResponseEntity.ok(service.getFileById(id));
    }
    @GetMapping
    public ResponseEntity<?> getAllData() {
        return ResponseEntity.ok(service.getAllData());
    }

    @PatchMapping
    public ResponseEntity<?> updateDataFromDrive() {
        return ResponseEntity.ok(service.updateData());
    }
}
