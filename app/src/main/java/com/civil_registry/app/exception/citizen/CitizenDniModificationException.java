package com.civil_registry.app.exception.citizen;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class CitizenDniModificationException extends RuntimeException {
    
        public CitizenDniModificationException(String dni) {
        super(String.format("Citizen with DNI %s cannot be modified", dni));
    }
}
