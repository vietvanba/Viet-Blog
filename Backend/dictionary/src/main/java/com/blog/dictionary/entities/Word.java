package com.blog.dictionary.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String word;
    private String frequency;
    @OneToOne(mappedBy = "word", cascade = CascadeType.ALL)
    private Pronunciation pronunciation;
    @OneToOne(mappedBy = "word", cascade = CascadeType.ALL)
    private Syllable syllables;
    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL)
    private List<WordDetail> results;
}
