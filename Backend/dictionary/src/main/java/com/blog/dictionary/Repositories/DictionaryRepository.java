package com.blog.dictionary.Repositories;

import com.blog.dictionary.entities.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DictionaryRepository extends JpaRepository<Word, String> {
    boolean existsByWord(String word);

    Optional<Word> findByWord(String word);
}
