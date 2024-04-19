package com.blog.googledrivestore.configs;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;

@Configuration
public class GoogleDriveApiConfig {
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();

    private static String getPathToGoogleCredentials() {
        String currentDictionary = System.getProperty("user.dir");
        Path filePath = Paths.get(currentDictionary, "credential.json");
        return filePath.toString();
    }

    @Bean
    public Drive createDriveConfig() throws GeneralSecurityException, IOException {

        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(SERVICE_ACCOUNT_KEY_PATH))
                .createScoped(DriveScopes.all());
        return new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                credential).setServicePath("drive/v2").setBatchPath("batch/drive/v2")
                .build();
    }
}
