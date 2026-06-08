package com.civil_registry.app.models.entities;

import java.time.LocalDateTime;

import com.civil_registry.app.enums.DocumentStatus;
import com.civil_registry.app.enums.DocumentType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String documentNumber;

    @Enumerated(EnumType.STRING)
    private DocumentType documentType;
    
    private LocalDateTime issueDate;
    
    @Enumerated(EnumType.STRING)
    private DocumentStatus status;

    private String description;

    @ManyToOne
    @JoinColumn(name = "citizen_id")
    private Citizen citizen;

    @OneToOne
    @JoinColumn(name = "file_document_id")
    private FileDocument fileDocument;

    public Document() {
    }

    public Document(Long id, String documentNumber, DocumentType documentType, LocalDateTime issueDate,
            DocumentStatus status, String description, Citizen citizen, FileDocument fileDocument) {
        this.id = id;
        this.documentNumber = documentNumber;
        this.documentType = documentType;
        this.issueDate = issueDate;
        this.status = status;
        this.description = description;
        this.citizen = citizen;
        this.fileDocument = fileDocument;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDateTime issueDate) {
        this.issueDate = issueDate;
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

    public Citizen getCitizen() {
        return citizen;
    }

    public void setCitizen(Citizen citizen) {
        this.citizen = citizen;
    }

    public FileDocument getFileDocument() {
        return fileDocument;
    }

    public void setFileDocument(FileDocument fileDocument) {
        this.fileDocument = fileDocument;
    }

    @Override
    public String toString() {
        return "Document [id=" + id + ", documentNumber=" + documentNumber + ", documentType=" + documentType
                + ", issueDate=" + issueDate + ", status=" + status + ", description=" + description + ", citizen="
                + citizen + ", fileDocument=" + fileDocument + "]";
    }

}
