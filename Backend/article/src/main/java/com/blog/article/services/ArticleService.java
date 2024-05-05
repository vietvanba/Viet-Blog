package com.blog.article.services;

import com.blog.article.DTOs.ArticleDTO;
import com.blog.article.entities.Article;
import com.blog.article.entities.Category;
import com.blog.article.enums.ArticleStatus;
import com.blog.article.enums.CategoryStatus;
import com.blog.article.repositories.ArticleRepository;
import com.blog.article.repositories.CategoryRepository;
import com.blog.article.response.ArticleMinimal;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository repository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper mapper;

    public ArticleDTO getArticle(String id) {
        Article article = repository.findById(id).orElseThrow();
        ArticleDTO dto = mapper.map(article, ArticleDTO.class);
        dto.setCategory(article.getCategory().getName());
        return dto;
    }

    public List<ArticleDTO> getAllArticle() {
        List<Article> list = repository.findAll();
        List<ArticleDTO> listDto = new ArrayList<>();
        list.forEach(x -> {
            ArticleDTO dto = mapper.map(x, ArticleDTO.class);
            dto.setCategory(x.getCategory().getName());
            listDto.add(dto);
        });
        return listDto;
    }

    public ArticleDTO createNewArticle(Article article) {
        Category category = categoryRepository.findById(article.getCategory().getId()).orElseThrow();
        if (category.getStatus() == CategoryStatus.DELETE)
            throw new RuntimeException("The category is invalid. Please choose another one.");
        article.setCreatedOn(new Date());
        article.setLastModifiedOn(new Date());
        article.setStatus(ArticleStatus.NEW);
        article.setCategory(category);
        article.setViews(0L);
        repository.save(article);
        ArticleDTO dto = mapper.map(article, ArticleDTO.class);
        dto.setCategory(category.getName());
        return dto;
    }

    public Page<?> getAllArticleByCategory(String categoryId, Integer pageNo, Integer pageSize) {
        PageRequest pageable = PageRequest.of(pageNo, pageSize);
        Page<Article> list = repository.findAllByCategory_Id(categoryId, pageable);
        return list.map(x -> {
            ArticleMinimal minimal = mapper.map(x, ArticleMinimal.class);
            minimal.setCategory(x.getCategory().getName());
            if (minimal.getContent().length() > 200) {
                minimal.setContent(minimal.getContent().substring(0, 200));
            }
            return minimal;
        });
    }
}
