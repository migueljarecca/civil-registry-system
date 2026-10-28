package com.civil_registry.app.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.civil_registry.app.auth.dto.AuthResponse;
import com.civil_registry.app.auth.dto.UserLoginRequestDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController 
@Tag (name = "Autenticación", description = "Endpoints for login")
public class AuthDocsController {
    
    @Operation(summary = "Login", description = "Obtain the JWT token. The Spring Security filter intercepts this at /login.")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserLoginRequestDto request) {
        // This method serves as a "placeholder" for Swagger to document the route.
        // The JwtAuthenticationFilter executes BEFORE this controller
        // and is what actually processes the login and returns the token.
        return null;
    }    
}
