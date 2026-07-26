package com.civil_registry.app.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.civil_registry.app.exception.common.ResourceAlreadyExistsException;
import com.civil_registry.app.exception.common.ResourceNotFoundException;
import com.civil_registry.app.models.dto.document.DocumentCreateDto;
import com.civil_registry.app.models.dto.document.DocumentResponseDto;
import com.civil_registry.app.models.entities.Citizen;
import com.civil_registry.app.models.entities.Document;
import com.civil_registry.app.models.entities.FileDocument;
import com.civil_registry.app.models.mapper.DocumentMapper;
import com.civil_registry.app.repositories.CitizenRepository;
import com.civil_registry.app.repositories.DocumentRepository;
import com.civil_registry.app.repositories.FileDocumentRepository;
import com.civil_registry.app.services.IDocumentService;

@Service
public class DocumentServiceImpl implements IDocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private CitizenRepository citizenRepository;

    @Autowired
    private FileDocumentRepository fileDocumentRepository;

    /**
     * List of all documents
     */
    @Override
    public List<DocumentResponseDto> fetchAllDocuments() {

        List<Document> documents = documentRepository.findAll();

        List<DocumentResponseDto> response = new ArrayList<>();

        for (Document document : documents) {
            response.add(DocumentMapper.toDocumentResponseDto(document));
        }

        return response;
    }

    /**
     * @param id - input id
     * @return - Document details based on a given id
     * */
    @Override
    public DocumentResponseDto fetchDocument(Long id) {

        Document document = documentRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Document", "id", id)
        );

        DocumentResponseDto documentResponseDto = DocumentMapper.toDocumentResponseDto(document);

        return documentResponseDto;

    }

    /**
     * @DocumentCreateDto - DocumentCreateDto Object
     * @Return - boolean indicating if the update of citizen details is successful or not
     */
    @Override
    public void createDocument(DocumentCreateDto documentCreateDto) {

        Document document = DocumentMapper.toDocument(documentCreateDto);

        Optional<Document> opDocument = documentRepository.findByDocumentNumber(document.getDocumentNumber());

        if (opDocument.isPresent()) {
            throw new ResourceAlreadyExistsException(
                "Document with number " + document.getDocumentNumber() + " already exists.");
        }

        Citizen citizen = citizenRepository.findById(documentCreateDto.getCitizenId()).orElseThrow(
            () -> new ResourceNotFoundException(
                "Citizen", "id", documentCreateDto.getCitizenId())
        );

        document.setCitizen(citizen);

        FileDocument fileDocument = fileDocumentRepository.findById(documentCreateDto.getFileDocumentId()).orElseThrow(
            () -> new ResourceNotFoundException(
                "FileDocument", "id", documentCreateDto.getFileDocumentId())
        );

        document.setFileDocument(fileDocument);

        documentRepository.save(document);
    }


    /**
     * Updates an existing document.
     *
     * @param id the document ID.
     * @param documentCreateDto the data used to update the document.
     * @return true if the document was updated successfully.
     */
    @Override
    public boolean updateDocument(Long id, DocumentCreateDto documentCreateDto) {

        Document document = documentRepository.findById(id)
            .orElseThrow(() -> 
                new ResourceNotFoundException("Document", "id", id)
        );

        Optional<Document> existingDocument = 
            documentRepository.findByDocumentNumber(documentCreateDto.getDocumentNumber());

        /**
         * Same document -> allowed.
         * Different document with the same number -> exception.
         */   
        if (existingDocument.isPresent() 
            && !existingDocument.get().getId().equals(id)) {

                throw new ResourceAlreadyExistsException(
                    "Document with number " 
                        + documentCreateDto.getDocumentNumber() 
                        + " already exists.");
        }

        Citizen citizen = citizenRepository.findById(documentCreateDto.getCitizenId())
            .orElseThrow(() ->
                new ResourceNotFoundException(
                    "Citizen", 
                    "id", 
                    documentCreateDto.getCitizenId())
        );

        FileDocument fileDocument = fileDocumentRepository.findById(documentCreateDto.getFileDocumentId())
            .orElseThrow(() ->
                new ResourceNotFoundException(
                    "FileDocument", 
                    "id", 
                    documentCreateDto.getFileDocumentId())
        );

        DocumentMapper.updateDocumentFromDto(document, documentCreateDto);

        document.setCitizen(citizen);
        document.setFileDocument(fileDocument);

        documentRepository.save(document);

        return true;
    }

    @Override
    public boolean deleteDocument(Long id) {

        Document document = documentRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Document", "id", id)
        );

        documentRepository.delete(document);

        return true;

    }

    
}
