package com.civil_registry.app.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserLoginRequestDto(

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid address")    
    String email,

    @NotBlank(message = "Password is required")
    String password
) {
    
}
