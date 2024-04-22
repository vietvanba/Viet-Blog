package com.blog.googledrivestore.DTOs;

import com.blog.googledrivestore.entities.Dictionary;
import com.blog.googledrivestore.entities.File;
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

    public File convertToFileEntities(com.google.api.services.drive.model.File googleFile) {
        return File.builder()
                .id(googleFile.getId())
                .name(googleFile.getName())
                .kind(googleFile.getKind())
                .mineType(googleFile.getMimeType())
                .build();
    }
}
