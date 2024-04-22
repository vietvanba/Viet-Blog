package com.blog.googledrivestore.repositories;

import com.blog.googledrivestore.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, String> {
}