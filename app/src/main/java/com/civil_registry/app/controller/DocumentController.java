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

import com.civil_registry.app.constants.DocumentConstants;
import com.civil_registry.app.models.dto.ResponseDto;
import com.civil_registry.app.models.dto.document.DocumentCreateDto;
import com.civil_registry.app.models.dto.document.DocumentResponseDto;
import com.civil_registry.app.services.DocumentService;

@RestController
@RequestMapping(path = "/documents", produces = {MediaType.APPLICATION_JSON_VALUE})
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService iDocumentService) {
        this.documentService = iDocumentService;
    }


    @GetMapping
    public ResponseEntity<List<DocumentResponseDto>>fetchAllDocuments() {

        List<DocumentResponseDto> documents = documentService.fetchAllDocuments();
        
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(documents);
    }


    @GetMapping("/{id}")
    public ResponseEntity<DocumentResponseDto>fetchDocument(@PathVariable Long id) {

        DocumentResponseDto documentResponseDto = documentService.fetchDocument(id);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(documentResponseDto);

    }


    @PostMapping
    public ResponseEntity<ResponseDto>createDocument(@RequestBody DocumentCreateDto documentCreateDto) {

        documentService.createDocument(documentCreateDto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ResponseDto(DocumentConstants.MESSAGE_200, DocumentConstants.MESSAGE_200));

    }


    @PutMapping("/{id}")
    public ResponseEntity<ResponseDto>updateDocument(@PathVariable Long id, @RequestBody DocumentCreateDto documentCreateDto) {

        boolean isUpdated = documentService.updateDocument(id, documentCreateDto);

        if (isUpdated) {
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(DocumentConstants.STATUS_200, DocumentConstants.MESSAGE_200));            
        } else {
            return ResponseEntity
                .status(HttpStatus.EXPECTATION_FAILED)
                .body(new ResponseDto(DocumentConstants.STATUS_417, DocumentConstants.MESSAGE_417_UPDATE));
        }

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto>deleteDocument(@PathVariable Long id) {

        boolean isDeleted = documentService.deleteDocument(id);

        if (isDeleted) {
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(DocumentConstants.STATUS_200, DocumentConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                .status(HttpStatus.EXPECTATION_FAILED)
                .body(new ResponseDto(DocumentConstants.STATUS_417, DocumentConstants.MESSAGE_417_DELETE));
        }        
    }
    
}
