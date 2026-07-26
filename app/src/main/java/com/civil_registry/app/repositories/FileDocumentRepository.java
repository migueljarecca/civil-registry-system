package com.civil_registry.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.civil_registry.app.models.entities.FileDocument;

@Repository
public interface FileDocumentRepository extends JpaRepository<FileDocument, Long> {
    

}
