package com.civil_registry.app.auth.dto;

public record AuthResponse(
    String token,
    String type,
    String email
) {

}
