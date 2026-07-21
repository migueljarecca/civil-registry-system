package com.civil_registry.app.models.dto.document;

import com.civil_registry.app.enums.DocumentStatus;
import com.civil_registry.app.enums.DocumentType;

public class DocumentCreateDto {
    
    private String documentNumber;
    private DocumentType documentType;
    private DocumentStatus status;
    private String description;

    private Long citizenId;
    private Long fileDocumentId;

    public DocumentCreateDto() {
    }

    public DocumentCreateDto(String documentNumber, DocumentType documentType, DocumentStatus status, String description, Long citizenId, Long fileDocumentId) {
        this.documentNumber = documentNumber;
        this.documentType = documentType;
        this.status = status;
        this.description = description;
        this.citizenId = citizenId;
        this.fileDocumentId = fileDocumentId;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public DocumentStatus getStatus() {
        return status;
    }

    public void setStatus(DocumentStatus status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCitizenId() {
        return citizenId;
    }

    public void setCitizenId(Long citizenId) {
        this.citizenId = citizenId;
    }

    public Long getFileDocumentId() {
        return fileDocumentId;
    }

    public void setFileDocumentId(Long fileDocumentId) {
        this.fileDocumentId = fileDocumentId;
    }

    public void setFileDocument(Long fileDocumentId) {
        this.fileDocumentId = fileDocumentId;
    }

    @Override
    public String toString() {
        return "DocumentCreateDto [documentNumber=" + documentNumber + ", documentType=" + documentType + ", status="
                + status + ", description=" + description + ", citizenId=" + citizenId + ", fileDocumentId="
                + fileDocumentId + "]";
    }

}
