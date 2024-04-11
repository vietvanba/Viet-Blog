package com.blog.gooogledrivestore.services;

import com.blog.gooogledrivestore.DTOs.DictionaryDTO;
import com.blog.gooogledrivestore.DTOs.EntityDTOMapper;
import com.blog.gooogledrivestore.entities.Dictionary;
import com.blog.gooogledrivestore.repositories.DictionaryRepository;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoogleDriveService {
    private final Drive drive;
    @Value("${google.drive.root-dictionary}")
    private String folderId;
    private final DictionaryRepository repository;
    private final EntityDTOMapper mapper;

    public Dictionary fetchFromDrive(String folderId, String name) {
        Dictionary dictionary = new Dictionary();
        try {
            dictionary.setId(folderId);
            dictionary.setName(name);

            List<File> listFiles = drive.files().list()
                    .setQ("'" + folderId + "' in parents")
                    .execute()
                    .getFiles();

            dictionary.setFiles(listFiles.parallelStream()
                    .filter(file -> !file.getMimeType().equals("application/vnd.google-apps.folder"))
                    .map(file -> {
                        com.blog.gooogledrivestore.entities.File mappedFile = mapper.convertToFileEntities(file);
                        mappedFile.setDictionary(dictionary);
                        return mappedFile;
                    })
                    .sorted(Comparator.comparing(com.blog.gooogledrivestore.entities.File::getName))
                    .collect(Collectors.toList()));

            dictionary.setDictionaries(listFiles.parallelStream()
                    .filter(file -> file.getMimeType().equals("application/vnd.google-apps.folder"))
                    .map(file -> fetchFromDrive(file.getId(), file.getName()))
                    .sorted(Comparator.comparing(Dictionary::getName))
                    .collect(Collectors.toList()));

        } catch (IOException exception) {
            throw new RuntimeException("Error occurred while retrieving files: " + exception.getMessage(), exception);
        }
        return dictionary;
    }

    public DictionaryDTO getAllData() {
        return mapper.convertToDTO(repository.findById(folderId).orElseThrow());
    }
    public DictionaryDTO updateData()
    {
        return mapper.convertToDTO(repository.save(fetchFromDrive(folderId,"root")));
    }
    public DictionaryDTO getFileById(String id) {
        return mapper.convertToDTO(repository.findById(id).orElseThrow());
    }
}
