package com.blog.article.services;

import com.blog.article.DTOs.CategoryDTO;
import com.blog.article.entities.Category;
import com.blog.article.enums.CategoryStatus;
import com.blog.article.repositories.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    ModelMapper mapper;
    @Autowired
    CategoryRepository repository;

    public CategoryDTO createNewCategory(Category category) {
        if (repository.existsByName(category.getName()))
            throw new RuntimeException("This category has been existed");
        category.setStatus(CategoryStatus.IS_ACTIVE);
        return mapper.map(repository.save(category), CategoryDTO.class);
    }

    public List<CategoryDTO> getAllCategory() {
        List<Category> list = repository.findAll();
        List<CategoryDTO> listDto = new ArrayList<>();
        list.forEach(x -> {
            listDto.add(mapper.map(x, CategoryDTO.class));
        });
        return listDto;
    }

    public CategoryDTO getCategory(String id) {
        return mapper.map(repository.findById(id), CategoryDTO.class);
    }
}
