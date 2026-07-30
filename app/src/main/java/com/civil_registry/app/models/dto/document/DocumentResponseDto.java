package com.civil_registry.app.models.dto.document;

import java.time.LocalDateTime;

import com.civil_registry.app.enums.DocumentStatus;
import com.civil_registry.app.enums.DocumentType;

public record DocumentResponseDto(

    Long id,
    String documentNumber,
    DocumentType documentType,
    DocumentStatus status,
    String description,
    
    Long citizenId,
    Long fileDocumentId,

    LocalDateTime createdAt,
    String createdBy,
    LocalDateTime updatedAt,
    String updatedBy

) {
}

