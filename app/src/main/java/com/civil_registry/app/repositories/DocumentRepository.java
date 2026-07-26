package com.civil_registry.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.civil_registry.app.models.entities.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    
    Optional<Document> findByDocumentNumber(String documentNumber);
}
