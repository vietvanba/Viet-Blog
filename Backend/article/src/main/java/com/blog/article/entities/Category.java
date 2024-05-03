package com.blog.article.entities;

import com.blog.article.enums.CategoryStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private CategoryStatus status;
    @OneToMany(mappedBy = "category")
    private List<Article> articles;
}
