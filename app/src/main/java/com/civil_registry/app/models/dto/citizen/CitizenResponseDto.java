package com.civil_registry.app.models.dto.citizen;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.civil_registry.app.enums.Gender;

public record CitizenResponseDto(
        Long id,
        String name,
        String lastname,
        String motherLastname,
        String dni,
        LocalDate birthDate,
        Gender gender,

        LocalDateTime createdAt,
        String createdBy,
        LocalDateTime updatedAt,
        String updatedBy
) {
}
