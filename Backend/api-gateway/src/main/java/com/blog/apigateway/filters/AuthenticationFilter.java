package com.blog.apigateway.filters;

import com.blog.apigateway.services.JwtUtil;
import com.blog.apigateway.validators.AuthorizationValidator;
import com.blog.apigateway.validators.RouterValidator;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RefreshScope
@Component
@RequiredArgsConstructor
public class AuthenticationFilter implements GatewayFilter {
    private final RouterValidator routerValidator;
    private final AuthorizationValidator authorizationValidator;
    private final JwtUtil jwtUtil;
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        LOGGER.info("Start request");
        LOGGER.info("URL: " + request.getURI() + " Ip address: " + request.getHeaders().get("X-Forwarded-For"));
        if (routerValidator.isSecured.test(request)) {
            if (this.isAuthMissing(request))
                return this.onError(exchange, HttpStatus.UNAUTHORIZED);
            final String token = this.getAuthHeader(request);
            if (jwtUtil.isInvalid(token))
                return this.onError(exchange, HttpStatus.FORBIDDEN);
            if (authorizationValidator.unauthorized.test(request))
                return this.onError(exchange, HttpStatus.FORBIDDEN);
            this.updateRequest(exchange, token);
        }
        LOGGER.info("Close request. Passed Authorization");
        return chain.filter(exchange);
    }

    private Mono<Void> onError(ServerWebExchange exchange, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        LOGGER.error("Close request. HttpStatus: " + httpStatus);
        return response.setComplete();
    }

    private String getAuthHeader(ServerHttpRequest request) {
        return request.getHeaders().getOrEmpty("Authorization").get(0).substring(7);
    }

    private boolean isAuthMissing(ServerHttpRequest request) {
        return !request.getHeaders().containsKey("Authorization");
    }

    private void updateRequest(ServerWebExchange exchange, String token) {
        Claims claims = jwtUtil.getAllClaimsFromToken(token);
        exchange.getRequest().mutate()
                .header("email", String.valueOf(claims.get("email")))
                .build();
    }
}
