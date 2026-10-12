package com.civil_registry.app.auth.dto;

public record UserLoginRequestDto(
    String email,
    String password
) {
    
}
