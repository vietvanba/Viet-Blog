package com.blog.dictionary.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WordDTO {
    private String word;
    private String frequency;
    private PronunciationDTO pronunciation;
    private SyllableDTO syllables;
    private List<WordDetailDTO> results;
}
