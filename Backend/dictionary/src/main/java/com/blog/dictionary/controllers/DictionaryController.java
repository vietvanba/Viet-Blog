package com.blog.dictionary.controllers;

import com.blog.dictionary.services.DictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dictionary")
public class DictionaryController {
    @Autowired
    DictionaryService service;

    @GetMapping("/{word}")
    public ResponseEntity<?> getWord(@PathVariable String word, @RequestParam(name = "search", defaultValue = "false") boolean search) {
        if (search)
            return ResponseEntity.ok(service.search(word));
        else {
            return ResponseEntity.ok(service.fetchWord(word));
        }
    }

    @GetMapping()
    public ResponseEntity<?> random(@RequestParam(name = "random", defaultValue = "false") boolean random) {
        if (random)
            return ResponseEntity.ok(service.random());
        else
            throw new RuntimeException("Error");
    }
}
