package com.blog.dictionary.DTOs;

import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WordDetailDTO {
    private String definition;
    private String partOfSpeech;
    private List<String> synonyms;
    private List<String> typeOf;
    private List<String> derivation;
    private List<String> hasTypes;
    private List<String> verbGroup;
    private List<String> antonyms;
    private List<String> examples;
    private List<String> also;
    private List<String> attribute;
    private List<String> similarTo;
}
