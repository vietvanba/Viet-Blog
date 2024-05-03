package com.blog.article.entities;

import com.blog.article.enums.ArticleStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @NotBlank(message = "Please insert the title")
    private String title;
    private String authorName;
    private String authorUsername;
    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "Please insert the content")
    private String content;
    private Long views;
    private ArticleStatus status;
    private Date createdOn;
    private Date lastModifiedOn;
    @ManyToOne
    private Category category;
}
