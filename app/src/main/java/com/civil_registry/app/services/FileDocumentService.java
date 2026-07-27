package com.civil_registry.app.services;

import java.util.List;

import com.civil_registry.app.models.dto.fileDocument.FileDocumentCreateDto;
import com.civil_registry.app.models.dto.fileDocument.FileDocumentResponseDto;

public interface FileDocumentService {
    
    /**
     * 
     * @return List of all file documents
     */
    List<FileDocumentResponseDto> fetchAllFileDocuments();


    /**
     * @param id - input id
     * @return File document details based on a given id.
     */
    FileDocumentResponseDto fetchFileDocument(Long id);


    /**
     * @param fileDocumentCreateDto - fileDocumentCreateDto Object
     */
    void createFileDocument(FileDocumentCreateDto fileDocumentCreateDto);


    /**
     *
     * @param fileDocumentCreateDto Object
     * @return boolean indicating if the update of file document details if successful or not
     */
    boolean updateFileDocument(Long id, FileDocumentCreateDto fileDocumentCreateDto);



    /**
     * @param id - input id
     * @return boolean indicating if the delete of file document details is successful or not
     */
    boolean deleteFileDocument(Long id);
}

