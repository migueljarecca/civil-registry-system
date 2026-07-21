package com.civil_registry.app.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.civil_registry.app.models.dto.document.DocumentResponseDto;
import com.civil_registry.app.models.entities.Document;
import com.civil_registry.app.models.mapper.DocumentMapper;
import com.civil_registry.app.repositories.DocumentRepository;
import com.civil_registry.app.services.IDocumentService;

@Service
public class DocumentServiceImpl implements IDocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public List<DocumentResponseDto> fetchAllDocuments() {

        List<Document> documents = documentRepository.findAll();

        List<DocumentResponseDto> response = new ArrayList<>();

        for (Document document : documents) {
            response.add(DocumentMapper.toDocumentResponseDto(document));
        }

        return response;
    }

    @Override
    public DocumentResponseDto fetchDocument(Long id) {

        Document document = documentRepository.findById(id).orElseThrow();

        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'fetchDocument'");
    }

    @Override
    public void createDocument(DocumentResponseDto documentCreateDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createDocument'");
    }

    @Override
    public boolean updateDocument(Long id, DocumentResponseDto documentCreateDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateDocument'");
    }

    @Override
    public boolean deleteDocument(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteDocument'");
    }

    
}
