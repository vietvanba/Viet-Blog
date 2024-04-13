package com.blog.authservice.repositories;

import com.blog.authservice.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,String> {
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String phoneNumber);

    Boolean existsByUsername(String username);
    Optional<Account> findByUsername(String username);
}
