package com.blog.question.controllers;

import com.blog.question.entities.Question;
import com.blog.question.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")
@RequiredArgsConstructor
public class QuestionController {
    private static final Logger LOGGER= LoggerFactory.getLogger(QuestionController.class);
    private final QuestionService questionService;
    @GetMapping
    public ResponseEntity<?> getQuestion(@RequestParam(defaultValue = "0") Integer pageNo,@RequestParam(defaultValue = "10") Integer pageSize) {
        LOGGER.trace("Get question pageNo = "+pageNo+" pageSize = "+pageSize);
        return ResponseEntity.ok(questionService.getAll(pageNo,pageSize));
    }
    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.create(question));
    }
    @PostMapping("/list")
    public ResponseEntity<?> createListQuestion(@RequestBody List<Question> question) {
        return ResponseEntity.ok(questionService.createAll(question));
    }
}
