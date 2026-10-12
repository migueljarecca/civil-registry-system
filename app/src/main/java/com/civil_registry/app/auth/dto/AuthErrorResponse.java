package com.civil_registry.app.auth.dto;

public record AuthErrorResponse(
    int status,
    String error,
    String message
) {
    
}
