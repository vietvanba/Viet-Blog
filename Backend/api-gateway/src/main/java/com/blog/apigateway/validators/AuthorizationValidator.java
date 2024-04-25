package com.blog.apigateway.validators;

import com.blog.apigateway.services.JwtUtil;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Component
@RequiredArgsConstructor
public class AuthorizationValidator {
    private final JwtUtil jwtUtil;

    private final List<AuthorizationURL> urls = new ArrayList<>();

    @PostConstruct
    public void init() {
        urls.add(new AuthorizationURL("/api/location", HttpMethod.GET, "USER"));
        urls.add(new AuthorizationURL("/api/account", HttpMethod.GET, "USER"));
        urls.add(new AuthorizationURL("/api/question", HttpMethod.GET, "USER"));
        urls.add(new AuthorizationURL("/api/question", HttpMethod.POST, "USER"));
        urls.add(new AuthorizationURL("/api/google", HttpMethod.PATCH, "ADMIN"));
    }

    public Predicate<ServerHttpRequest> unauthorized =
            request ->
                    urls.stream()
                            .noneMatch(url ->
                                    url.getRole().equals(getRole(request))
                                            && request.getURI().getPath().contains(url.getUrl())
                                            && request.getMethod().equals(url.getMethod())
                            );
    public Predicate<ServerHttpRequest> unauthorizedWithoutRole =
            request ->
                    urls.stream()
                            .anyMatch(url ->
                                    request.getURI().getPath().contains(url.getUrl())
                                            && request.getMethod().equals(url.getMethod())
                            );

    private String getRole(ServerHttpRequest request) {
        String token = request.getHeaders().getOrEmpty("Authorization").get(0).substring(7);
        return String.valueOf(jwtUtil.getAllClaimsFromToken(token).get("role"));
    }
}
