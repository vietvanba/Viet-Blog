package com.blog.question.services;

import com.blog.question.repositories.QuestionRepository;
import com.blog.question.entities.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository repository;
    public Question create(Question question) {
        return repository.save(question);
    }
    public List<Question> createAll(List<Question> question) {
        return repository.saveAll(question);
    }
    public Page<Question> getAll(Integer pageNo, Integer pageSize) {
        PageRequest pageable = PageRequest.of(pageNo, pageSize);
        return repository.findAll(pageable);
    }
}
