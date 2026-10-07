package com.civil_registry.app.models.dto.user;

import java.time.LocalDateTime;
import java.util.Set;

public record UserResponseDto(
    Long id,
    String name,
    String lastname,
    String dni,
    String email,
    Set<String> roles,
    boolean enabled,

    LocalDateTime createdAt,
    String createdBy,
    LocalDateTime updatedAt,
    String updatedBy    
) {
}