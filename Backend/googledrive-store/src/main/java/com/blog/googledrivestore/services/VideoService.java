package com.blog.googledrivestore.services;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final Drive drive;

    public File.VideoMediaMetadata getMetaDataVideo(String id) {
        File.VideoMediaMetadata metadata = new File.VideoMediaMetadata();
        try {
            metadata=drive.files().get(id).execute().getVideoMediaMetadata();
        }catch (IOException exception)
        {
            throw new RuntimeException("The video id is not correct");
        }
        return metadata;
    }
}
