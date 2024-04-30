package com.blog.authservice.services;

import com.blog.authservice.DTOs.AccountDTO;
import com.blog.authservice.DTOs.PersonalAddressDTO;
import com.blog.authservice.entities.Account;
import com.blog.authservice.exceptions.CannotSave;
import com.blog.authservice.repositories.AccountRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ValidationException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountService {
    @Autowired
    JwtService jwtService;
    @Autowired
    AccountRepository repository;
    @Autowired
    ModelMapper mapper;
    private static final Logger LOGGER = LoggerFactory.getLogger(AccountService.class);

    public AccountDTO getAccountInfo(HttpServletRequest request) {
        String token = jwtService.getAuthHeader(request);
        String username = jwtService.extractUsername(token);
        Account account = repository.findByUsername(username).orElseThrow();
        return getAccountDTO(account);
    }

    public AccountDTO updateAccount(Account account, HttpServletRequest request) {
        String token = jwtService.getAuthHeader(request);
        String username = jwtService.extractUsername(token);
        Account accountDB = repository.findByUsername(username).orElseThrow();
        if (repository.existsByPhoneNumber(account.getPhoneNumber()) && !accountDB.getPhoneNumber().equals(account.getPhoneNumber())) {
            LOGGER.error("Phone number already exists. Email: " + account.getEmail() + ". Phone number: " + account.getPhoneNumber());
            LOGGER.error("Create user failed");
            throw new CannotSave("Phone number already exists.\n Please choose another phone number");
        }
        if (accountDB.getUsername().equals(account.getUsername())) {
            //Logic has not been processed here. Please add validator and throw exception
            accountDB.setFirstName(account.getFirstName());
            accountDB.setLastName(account.getLastName());
            accountDB.setBirthday(account.getBirthday());
            accountDB.setAvatar(account.getAvatar());
            accountDB.setPhoneNumber(account.getPhoneNumber());
            repository.save(accountDB);
            return getAccountDTO(accountDB);
            //Logic has not been processed here. Please add validator and throw exception
        } else {
            throw new ValidationException("Can't verify the request!");
        }
    }

    private AccountDTO getAccountDTO(Account accountDB) {
        AccountDTO dto = mapper.map(accountDB, AccountDTO.class);
        List<PersonalAddressDTO> personalAddressDTO = new ArrayList<>();
        accountDB.getPersonalAddress().forEach(personalAddress -> personalAddressDTO.add(mapper.map(personalAddress, PersonalAddressDTO.class)));
        dto.setPersonalAddressDTOS(personalAddressDTO);
        return dto;
    }
}