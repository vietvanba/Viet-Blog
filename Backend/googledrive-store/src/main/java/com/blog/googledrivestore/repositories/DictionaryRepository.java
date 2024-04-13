package com.blog.googledrivestore.repositories;

import com.blog.googledrivestore.entities.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DictionaryRepository extends JpaRepository<Dictionary,String> {

}
