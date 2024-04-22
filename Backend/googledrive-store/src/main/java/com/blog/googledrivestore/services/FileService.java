package com.blog.googledrivestore.services;

import com.blog.googledrivestore.DTOs.EntityDTOMapper;
import com.blog.googledrivestore.DTOs.FileDTO;
import com.blog.googledrivestore.repositories.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository repository;
    private final EntityDTOMapper mapper;
    public FileDTO getFileById(String id) {
        return mapper.convertToDTO(repository.findById(id).orElseThrow());
    }
}
