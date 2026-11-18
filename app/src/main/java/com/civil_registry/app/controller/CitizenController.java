package com.civil_registry.app.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civil_registry.app.constants.UserConstants;
import com.civil_registry.app.models.dto.ResponseDto;
import com.civil_registry.app.models.dto.citizen.CitizenCreateDto;
import com.civil_registry.app.models.dto.citizen.CitizenResponseDto;
import com.civil_registry.app.services.CitizenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/citizens", produces = { MediaType.APPLICATION_JSON_VALUE })
public class CitizenController {

    private final CitizenService citizenService;

    public CitizenController(CitizenService citizenService) {
        this.citizenService = citizenService;
    }

    @GetMapping
    public ResponseEntity<List<CitizenResponseDto>> fetchAllCitizens() {
        return ResponseEntity.ok(citizenService.fetchAllCitizens());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitizenResponseDto> fetchCitizen(@PathVariable Long id) {
        return ResponseEntity.ok(citizenService.fetchCitizen(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CitizenResponseDto> createCitizen(@Valid @RequestBody CitizenCreateDto citizenCreateDto) {
        CitizenResponseDto created = citizenService.createCitizen(citizenCreateDto);
        URI location = URI.create("/citizens/" + created.id());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CitizenResponseDto> updateCitizen(@PathVariable Long id,
                                                            @Valid @RequestBody CitizenCreateDto citizenCreateDto) {
        CitizenResponseDto updated = citizenService.updateCitizen(id, citizenCreateDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDto> deleteCitizen(@PathVariable Long id) {
        citizenService.deleteCitizen(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(UserConstants.STATUS_200, "Citizen deleted successfully"));
    }
}