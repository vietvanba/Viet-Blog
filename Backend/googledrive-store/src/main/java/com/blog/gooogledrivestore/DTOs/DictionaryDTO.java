package com.blog.gooogledrivestore.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DictionaryDTO {
    private String id;
    private String name;
    private List<FileDTO> files = new ArrayList<>();
    private List<DictionaryDTO> dictionaries = new ArrayList<>();
}
