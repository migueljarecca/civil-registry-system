package com.civil_registry.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civil_registry.app.constants.FileDocumentConstants;
import com.civil_registry.app.models.dto.ResponseDto;
import com.civil_registry.app.models.dto.fileDocument.FileDocumentCreateDto;
import com.civil_registry.app.models.dto.fileDocument.FileDocumentResponseDto;
import com.civil_registry.app.services.FileDocumentService;

@RestController
@RequestMapping(path = "/file-documents", produces = {MediaType.APPLICATION_JSON_VALUE})
public class FileDocumentController {

    private final FileDocumentService fileDocumentService;

    public FileDocumentController(FileDocumentService fileDocumentService) {
        this.fileDocumentService = fileDocumentService;
    }

    @GetMapping
    public ResponseEntity<List<FileDocumentResponseDto>> fetchAllFileDocuments() {

        List<FileDocumentResponseDto> fileDocuments = fileDocumentService.fetchAllFileDocuments();

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(fileDocuments);
    }


    @GetMapping("/{id}")
    public ResponseEntity<FileDocumentResponseDto> fetchFileDocument(@PathVariable Long id) {
        FileDocumentResponseDto fileDocumentResponseDto = fileDocumentService.fetchFileDocument(id);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(fileDocumentResponseDto);
    }


    @PostMapping
    public ResponseEntity<ResponseDto> createFileDocument(
            @RequestBody FileDocumentCreateDto fileDocumentCreateDto) {

        fileDocumentService.createFileDocument(fileDocumentCreateDto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ResponseDto(FileDocumentConstants.STATUS_201, FileDocumentConstants.MESSAGE_201));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ResponseDto> updateFileDocument(
            @PathVariable Long id, 
            @RequestBody FileDocumentCreateDto fileDocumentCreateDto) {

        boolean isUpdated = fileDocumentService.updateFileDocument(id, fileDocumentCreateDto);

        if (isUpdated) {
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(FileDocumentConstants.STATUS_200, FileDocumentConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                .status(HttpStatus.EXPECTATION_FAILED)
                .body(new ResponseDto(FileDocumentConstants.STATUS_417, FileDocumentConstants.MESSAGE_417_UPDATE));
        }        
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto> deleteFileDocument(@PathVariable Long id) {

        boolean isDeleted = fileDocumentService.deleteFileDocument(id);

        if (isDeleted) {
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(FileDocumentConstants.STATUS_200, FileDocumentConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                .status(HttpStatus.EXPECTATION_FAILED)
                .body(new ResponseDto(FileDocumentConstants.STATUS_417, FileDocumentConstants.MESSAGE_417_DELETE));
        }
    }    
}
