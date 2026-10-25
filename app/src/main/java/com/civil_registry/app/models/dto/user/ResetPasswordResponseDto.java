package com.civil_registry.app.models.dto.user;

public record ResetPasswordResponseDto(
    String email,
    String temporaryPassword,
    String message
) {

}
