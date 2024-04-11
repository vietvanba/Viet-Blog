package com.blog.gooogledrivestore.repositories;

import com.blog.gooogledrivestore.entities.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DictionaryRepository extends JpaRepository<Dictionary,String> {

}
