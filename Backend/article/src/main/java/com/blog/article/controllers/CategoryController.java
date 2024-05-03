package com.blog.article.controllers;

import com.blog.article.entities.Article;
import com.blog.article.entities.Category;
import com.blog.article.services.ArticleService;
import com.blog.article.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    CategoryService service;

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategory(@PathVariable String id) {
        return ResponseEntity.ok(service.getCategory(id));
    }

    @GetMapping()
    public ResponseEntity<?> getAllCategory() {
        return ResponseEntity.ok(service.getAllCategory());
    }

    @PostMapping()
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(service.createNewCategory(category));
    }
}
