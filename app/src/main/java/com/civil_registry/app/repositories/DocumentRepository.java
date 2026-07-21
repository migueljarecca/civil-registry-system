package com.civil_registry.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.civil_registry.app.models.entities.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    
}
