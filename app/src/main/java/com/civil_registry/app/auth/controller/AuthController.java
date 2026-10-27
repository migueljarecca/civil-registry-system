package com.civil_registry.app.auth.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civil_registry.app.auth.dto.RegisterDto;
import com.civil_registry.app.auth.services.AuthService;
import com.civil_registry.app.models.dto.user.UserResponseDto;

import jakarta.validation.Valid;

@RestController 
@RequestMapping ("/auth")
public class AuthController {
    
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody RegisterDto registerDto) {

        UserResponseDto created = authService.register(registerDto);

        URI location = URI.create("/users/" + created.id());

        return ResponseEntity.created(location).body(created);
    }
        
}
