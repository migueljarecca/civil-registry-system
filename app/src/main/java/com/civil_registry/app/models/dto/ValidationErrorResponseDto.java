package com.civil_registry.app.models.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;

public record ValidationErrorResponseDto(

        String apiPath,
        HttpStatus httpStatus,
        String errorMessage,
        List<FieldError> errors,
        LocalDateTime errorTime
) {
        public record FieldError(String field, String message) {
    }
}
