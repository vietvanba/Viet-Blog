package com.blog.article.repositories;

import com.blog.article.entities.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, String> {
    Page<Article> findAllByCategory_Id(String categoryId, PageRequest pageable);
}
