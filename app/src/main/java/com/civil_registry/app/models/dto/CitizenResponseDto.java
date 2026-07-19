package com.civil_registry.app.models.dto;

import java.time.LocalDate;

import com.civil_registry.app.enums.Gender;

public record CitizenResponseDto(
    Long id,
    String dni,
    String name,
    String fatherLastName,
    String motherLastName,
    LocalDate birthDate,
    Gender gender
) {
}
