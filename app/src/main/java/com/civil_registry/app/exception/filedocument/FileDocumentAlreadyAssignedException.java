package com.civil_registry.app.exception.filedocument;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class FileDocumentAlreadyAssignedException extends RuntimeException {
    
    public FileDocumentAlreadyAssignedException(String resourceName, String fieldName, Long fieldValue) {
        super(String.format("%s with %s: %s is already assigned to another document",
                resourceName, fieldName, fieldValue));
    }
}
