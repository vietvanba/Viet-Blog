package com.blog.googledrivestore.services;

import com.blog.googledrivestore.DTOs.DictionaryDTO;
import com.blog.googledrivestore.DTOs.EntityDTOMapper;
import com.blog.googledrivestore.configs.GoogleDriveApiConfig;
import com.blog.googledrivestore.entities.Dictionary;
import com.blog.googledrivestore.repositories.DictionaryRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoogleDriveService {
    private final Drive drivev3;
    private Drive drivev2;

    @Value("${google.drive.root-dictionary}")
    private String folderId;
    private final DictionaryRepository repository;
    private final EntityDTOMapper mapper;

    @PostConstruct
    public void init() throws IOException, GeneralSecurityException {
        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(GoogleDriveApiConfig.SERVICE_ACCOUNT_KEY_PATH))
                .createScoped(DriveScopes.all());
        drivev2 = new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(),
                GoogleDriveApiConfig.JSON_FACTORY,
                credential).setServicePath("drive/v2").setBatchPath("batch/drive/v2")
                .build();
    }

    public Dictionary fetchFromDrive(String folderId, String name) {
        Dictionary dictionary = new Dictionary();
        try {
            dictionary.setId(folderId);
            dictionary.setName(name);

            List<File> listFiles = drivev3.files().list()
                    .setQ("'" + folderId + "' in parents")
                    .execute()
                    .getFiles();
            dictionary.setFiles(listFiles.parallelStream()
                    .filter(file -> !file.getMimeType().equals("application/vnd.google-apps.folder"))
                    .map(file -> {
                        try {
                            File fileDetails = drivev2.files().get(file.getId()).execute();
                            com.blog.googledrivestore.entities.File mappedFile = mapper.convertToFileEntities(fileDetails);
                            mappedFile.setDictionary(dictionary);
                            return mappedFile;
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .sorted(Comparator.comparing(com.blog.googledrivestore.entities.File::getName))
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

    public DictionaryDTO updateData() {
        return mapper.convertToDTO(repository.save(fetchFromDrive(folderId, "root")));
    }

    public DictionaryDTO getFileById(String id) {
        return mapper.convertToDTO(repository.findById(id).orElseThrow());
    }
}
