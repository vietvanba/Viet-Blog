package com.blog.authservice.services;

import com.blog.authservice.entities.Account;
import com.blog.authservice.exceptions.CannotSave;
import com.blog.authservice.exceptions.LoginFailed;
import com.blog.authservice.payload.AuthenticationRequest;
import com.blog.authservice.payload.AuthenticationResponse;
import com.blog.authservice.payload.RegisterRequest;
import com.blog.authservice.payload.RegisterResponse;
import com.blog.authservice.repositories.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final AuthenticationManager authenticationManager;
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthService.class);

    public RegisterResponse register(RegisterRequest request) {
        var user = Account.builder()
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .birthday(request.getBirthday())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .personalAddress(null)
                .createdTime(new Date())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .avatar(request.getAvatar())
                .active(request.getActive())
                .noteActive(request.getNoteActive())
                .build();
        if (accountRepository.existsByEmail(user.getEmail())) {
            LOGGER.error("Email already exists. Email: " + user.getEmail());
            LOGGER.error("Create user failed");
            throw new CannotSave("Email already exists." +
                    "Please choose another email or reset your password");
        }
        if (accountRepository.existsById(user.getUsername())) {
            LOGGER.error("Username already exists. Email: " + user.getEmail() + ". Username: " + user.getUsername());
            LOGGER.error("Create user failed");
            throw new CannotSave("The username already exists. Please choose another username");
        }
        if (accountRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            LOGGER.error("Phone number already exists. Email: " + user.getEmail() + ". Phone number: " + user.getPhoneNumber());
            LOGGER.error("Create user failed");
            throw new CannotSave("Phone number already exists. Please choose another phone number");
        }
        try {
            accountRepository.save(user);
            return RegisterResponse.builder()
                    .username(user.getUsername())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .birthday(user.getBirthday())
                    .avatar(user.getAvatar())
                    .email(user.getEmail())
                    .active(user.getActive())
                    .noteActive(user.getNoteActive())
                    .phoneNumber(user.getPhoneNumber())
                    .password(user.getPassword())
                    .role(user.getRole())
                    .build();
        } catch (Exception e) {
            LOGGER.error("Can't create user. Email: " + user.getEmail());
            throw new CannotSave(e.getMessage());
        }
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        try {
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
            authenticationManager.authenticate(authentication);
        } catch (Exception exception) {
            LOGGER.error("Login failed: " + request.getUsername());
            throw new LoginFailed("Username or password is not correct. Please try again");
        }
        var user = accountRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        LOGGER.error("Login succeed: " + request.getUsername());
        return AuthenticationResponse.builder()
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .accessToken(jwtToken)
                .build();
    }
}
