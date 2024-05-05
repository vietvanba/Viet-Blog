package com.blog.article.response;

import com.blog.article.enums.ArticleStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleMinimal {
    private String id;
    private String title;
    private String authorName;
    private String authorUsername;
    private String content;
    private Long views;
    private String category;
}
