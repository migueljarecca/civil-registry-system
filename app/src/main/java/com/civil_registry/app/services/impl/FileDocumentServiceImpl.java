package com.civil_registry.app.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.civil_registry.app.models.dto.fileDocument.FileDocumentCreateDto;
import com.civil_registry.app.models.dto.fileDocument.FileDocumentResponseDto;
import com.civil_registry.app.models.entities.FileDocument;
import com.civil_registry.app.models.mapper.FileDocumentMapper;
import com.civil_registry.app.repositories.FileDocumentRepository;
import com.civil_registry.app.services.FileDocumentService;

@Service
public class FileDocumentServiceImpl implements FileDocumentService {

    private final FileDocumentRepository fileDocumentRepository;

    public FileDocumentServiceImpl(FileDocumentRepository fileDocumentRepository) {
        this.fileDocumentRepository = fileDocumentRepository;
    }

    @Override
    public List<FileDocumentResponseDto> fetchAllFileDocuments() {

        List<FileDocument> fileDocuments = fileDocumentRepository.findAll();

        List<FileDocumentResponseDto> response = new ArrayList<>();

        for (FileDocument fileDocument : fileDocuments) {

            response.add(FileDocumentMapper.toFileDocumentResponseDto(fileDocument));
        }
        
        return response;
    }

    @Override
    public FileDocumentResponseDto fetchFileDocument(Long id) {

        FileDocument fileDocument = fileDocumentRepository.findById(id).orElseThrow(
            () -> new RuntimeException("File document not found with id: " + id)
        );

        FileDocumentResponseDto fileDocumentResponseDto = FileDocumentMapper.toFileDocumentResponseDto(fileDocument);

        return fileDocumentResponseDto;

    }

    @Override
    public void createFileDocument(FileDocumentCreateDto fileDocumentCreateDto) {

        FileDocument fileDocument = FileDocumentMapper.createFileDocumentFromDto(fileDocumentCreateDto);

        fileDocumentRepository.save(fileDocument);

    }

    @Override
    public boolean updateFileDocument(Long id, FileDocumentCreateDto fileDocumentCreateDto) {

        FileDocument fileDocument = fileDocumentRepository.findById(id).orElseThrow(
            () -> new RuntimeException("File document not found with id: " + id)
        );

        FileDocumentMapper.updateFileDocumentFromDto(fileDocument, fileDocumentCreateDto);

        fileDocumentRepository.save(fileDocument);

        return true;
    }

    @Override
    public boolean deleteFileDocument(Long id) {

        FileDocument fileDocument = fileDocumentRepository.findById(id).orElseThrow(
            () -> new RuntimeException("File document not found with id: " + id)
        );

        fileDocumentRepository.delete(fileDocument);

        return true;
    }

    
    
}
