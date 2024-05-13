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
public class WordDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String definition;
    private String partOfSpeech;
    @ElementCollection
    private List<String> synonyms;
    @ElementCollection
    private List<String> typeOf;
    @ElementCollection
    private List<String> hasTypes;
    @ElementCollection
    private List<String> also;
    @ElementCollection
    private List<String> attribute;
    @ElementCollection
    private List<String> similarTo;
    @ElementCollection
    private List<String> verbGroup;
    @ElementCollection
    private List<String> antonyms;
    @ElementCollection
    private List<String> examples;
    @ElementCollection
    private List<String> derivation;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    private Word word;
}
