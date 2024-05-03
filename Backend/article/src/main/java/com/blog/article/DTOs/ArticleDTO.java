package com.blog.article.DTOs;

import com.blog.article.enums.ArticleStatus;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDTO {
    private String id;
    private String title;
    private String authorName;
    private String authorUsername;
    private String content;
    private Long views;
    private ArticleStatus status;
    private Date createdOn;
    private Date lastModifiedOn;
    private String category;
}
