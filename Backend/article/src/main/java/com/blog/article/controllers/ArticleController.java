package com.blog.article.controllers;

import com.blog.article.entities.Article;
import com.blog.article.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    ArticleService service;

    @GetMapping("/{id}")
    public ResponseEntity<?> getArticle(@PathVariable String id) {
        return ResponseEntity.ok(service.getArticle(id));
    }

    @GetMapping()
    public ResponseEntity<?> getAllArticle() {
        return ResponseEntity.ok(service.getAllArticle());
    }

    @PostMapping()
    public ResponseEntity<?> createArticle(@Validated @RequestBody Article article) {
        return ResponseEntity.ok(service.createNewArticle(article));
    }
}
