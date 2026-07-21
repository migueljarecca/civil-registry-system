package com.civil_registry.app.models.mapper;

import com.civil_registry.app.models.dto.document.DocumentCreateDto;
import com.civil_registry.app.models.dto.document.DocumentResponseDto;
import com.civil_registry.app.models.entities.Document;

public class DocumentMapper {
    
    public static Document toDocument(DocumentCreateDto documentCreateDto) {

        Document document = new Document();

        document.setDocumentNumber(documentCreateDto.getDocumentNumber());
        document.setDocumentType(documentCreateDto.getDocumentType());
        document.setStatus(documentCreateDto.getStatus());            
        document.setDescription(documentCreateDto.getDescription());

        return document;
    }   


    public static DocumentResponseDto toDocumentResponseDto(Document document) {

        DocumentResponseDto documentResponseDto = new DocumentResponseDto(
            document.getId(),
            document.getDocumentNumber(),
            document.getDocumentType(),
            document.getStatus(),
            document.getDescription(),

            document.getCitizen().getId(),
            document.getFileDocument().getId()
        );

        return documentResponseDto;

    }
    
}
