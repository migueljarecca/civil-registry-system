package com.civil_registry.app.models.mapper;

import com.civil_registry.app.models.dto.fileDocument.FileDocumentCreateDto;
import com.civil_registry.app.models.dto.fileDocument.FileDocumentResponseDto;
import com.civil_registry.app.models.entities.FileDocument;

public class FileDocumentMapper {
    
    public static FileDocument createFileDocumentFromDto(
        FileDocumentCreateDto fileDocumentCreateDto) {

        FileDocument fileDocument = new FileDocument();

        fileDocument.setFileName(fileDocumentCreateDto.getFileName());
        fileDocument.setFileUrl(fileDocumentCreateDto.getFileUrl());
        fileDocument.setFileSize(fileDocumentCreateDto.getFileSize());
        fileDocument.setContentType(fileDocumentCreateDto.getContentType());

        return fileDocument;
    }


    public static void updateFileDocumentFromDto(
        FileDocument fileDocument, FileDocumentCreateDto fileDocumentCreateDto) {

        fileDocument.setFileName(fileDocumentCreateDto.getFileName());
        fileDocument.setFileUrl(fileDocumentCreateDto.getFileUrl());
        fileDocument.setFileSize(fileDocumentCreateDto.getFileSize());
        fileDocument.setContentType(fileDocumentCreateDto.getContentType());
    }

    public static FileDocumentResponseDto toFileDocumentResponseDto(
        FileDocument fileDocument) {

        return new FileDocumentResponseDto(
            fileDocument.getId(),
            fileDocument.getFileName(),
            fileDocument.getFileUrl(),
            fileDocument.getFileSize(),
            fileDocument.getContentType(),

            fileDocument.getCreatedAt(),
            fileDocument.getCreatedBy(),
            fileDocument.getUpdatedAt(),
            fileDocument.getUpdatedBy()
        );    

    }
}
