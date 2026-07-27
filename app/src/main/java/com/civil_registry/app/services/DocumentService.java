package com.civil_registry.app.services;

import java.util.List;

import com.civil_registry.app.models.dto.document.DocumentCreateDto;
import com.civil_registry.app.models.dto.document.DocumentResponseDto;

public interface DocumentService {
    
    /**
     * 
     * @return List of all documents
     */
    List<DocumentResponseDto> fetchAllDocuments();


    /**
     * @param id - input id
     * @return Document details based on a given id.
     */
    DocumentResponseDto fetchDocument(Long id);

    
    /**
     * @param documentCreateDto - documentCreateDto Object
     */
    void createDocument(DocumentCreateDto documentCreateDto);


    /**
     *
     * @param documentCreateDto Object
     * @return boolean indicating if the update of document details if successful or not
     */
    boolean updateDocument(Long id, DocumentCreateDto documentCreateDto);


    /**
     *
     * @param id - Input id
     * @return boolean indicating if the delete of Document details is successful or not
     */
    boolean deleteDocument(Long id);
}
