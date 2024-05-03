package com.blog.apigateway.configs;

import com.blog.apigateway.filters.AuthenticationFilter;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class GatewayConfig {
    private final AuthenticationFilter authenticationFilter;
    @Value("${name.services.auth}")
    private String authServiceName;
    @Value("${name.services.question}")
    private String questionServiceName;
    @Value("${name.services.mail}")
    private String mailServiceName;
    @Value("${name.services.location}")
    private String locationServiceName;
    @Value("${name.services.google}")
    private String googleDriveStore;
    @Value("${name.services.article}")
    private String articleServiceName;
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("mail-service", r -> r.path("/api/mail/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri("http://"+mailServiceName+":8081"))
                .route("auth-service", r -> r.path("/api/auth/**","/api/account/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri("http://"+authServiceName+":8082"))
                .route("location-service", r -> r.path("/api/location/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri("http://"+locationServiceName+":8083"))
                .route("question-service", r -> r.path("/api/question/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri("http://"+questionServiceName+":8084"))
                .route("googledrive-store", r -> r.path("/api/google/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri("http://"+googleDriveStore+":8086"))
                .route("article-service", r -> r.path("/api/article/**","/api/category")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri("http://"+articleServiceName+":8087"))
                .build();
    }
}
