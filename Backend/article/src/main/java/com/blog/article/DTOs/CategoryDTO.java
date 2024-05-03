package com.blog.article.DTOs;

import com.blog.article.enums.CategoryStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private String id;
    private String name;
    private CategoryStatus status;
}
