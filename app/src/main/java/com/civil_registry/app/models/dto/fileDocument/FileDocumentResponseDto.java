package com.civil_registry.app.models.dto.fileDocument;

public record FileDocumentResponseDto(
    Long id,
    String fileName,
    String fileUrl,
    Long fileSize,
    String contentType
) {
    
}
