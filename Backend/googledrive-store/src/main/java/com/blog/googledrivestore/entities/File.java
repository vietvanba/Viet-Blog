package com.blog.googledrivestore.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class File {
    @Id
    private String id;
    private String name;
    private String kind;
    private String fileExtension;
    private String thumbnailLink;
    private Long durationMillis;
    @ManyToOne
    private Dictionary dictionary;

}
