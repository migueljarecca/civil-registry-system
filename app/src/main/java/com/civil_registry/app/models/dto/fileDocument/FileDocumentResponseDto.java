package com.civil_registry.app.models.dto.fileDocument;

import java.time.LocalDateTime;

public record FileDocumentResponseDto(
    Long id,
    String fileName,
    String fileUrl,
    Long fileSize,
    String contentType,

    LocalDateTime createdAt,
    String createdBy,
    LocalDateTime updatedAt,
    String updatedBy
) {
    
}
