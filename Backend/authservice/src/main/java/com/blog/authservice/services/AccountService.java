package com.blog.authservice.services;

import com.blog.authservice.DTOs.AccountDTO;
import com.blog.authservice.DTOs.PersonalAddressDTO;
import com.blog.authservice.entities.Account;
import com.blog.authservice.repositories.AccountRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ValidationException;
import org.modelmapper.ModelMapper;
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
    public AccountDTO getAccountInfo(HttpServletRequest request){
        String token = jwtService.getAuthHeader(request);
        String username = jwtService.extractUsername(token);
        Account account= repository.findByUsername(username).orElseThrow();
        AccountDTO dto = mapper.map(account, AccountDTO.class);
        List<PersonalAddressDTO> personalAddressDTO = new ArrayList<>();
        account.getPersonalAddress().forEach(personalAddress -> personalAddressDTO.add(mapper.map(personalAddress, PersonalAddressDTO.class)));
        dto.setPersonalAddressDTOS(personalAddressDTO);
        return dto;
    }
}