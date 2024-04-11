package com.blog.gooogledrivestore.DTOs;

import com.blog.gooogledrivestore.entities.Dictionary;
import com.blog.gooogledrivestore.entities.File;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EntityDTOMapper {
    private final ModelMapper modelMapper;

    public DictionaryDTO convertToDTO(Dictionary dictionary) {
        return modelMapper.map(dictionary, DictionaryDTO.class);
    }

    public FileDTO convertToDTO(File file) {
        return modelMapper.map(file, FileDTO.class);
    }

    public File convertToFileEntities(com.google.api.services.drive.model.File file) {
        return modelMapper.map(file, File.class);
    }
}
