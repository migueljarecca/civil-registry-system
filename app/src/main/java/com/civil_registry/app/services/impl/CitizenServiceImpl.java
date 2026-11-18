package com.civil_registry.app.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.civil_registry.app.exception.common.ResourceAlreadyExistsException;
import com.civil_registry.app.exception.common.ResourceNotFoundException;
import com.civil_registry.app.models.dto.citizen.CitizenCreateDto;
import com.civil_registry.app.models.dto.citizen.CitizenResponseDto;
import com.civil_registry.app.models.entities.Citizen;
import com.civil_registry.app.models.mapper.CitizenMapper;
import com.civil_registry.app.repositories.CitizenRepository;
import com.civil_registry.app.services.CitizenService;

@Service
public class CitizenServiceImpl implements CitizenService {

    private final CitizenRepository citizenRepository;

    public CitizenServiceImpl(CitizenRepository citizenRepository) {
        this.citizenRepository = citizenRepository;
    }

    @Override
    public List<CitizenResponseDto> fetchAllCitizens() {
        List<Citizen> citizens = citizenRepository.findAll();
        List<CitizenResponseDto> response = new ArrayList<>();

        for (Citizen citizen : citizens) {
            response.add(CitizenMapper.toResponseDto(citizen));
        }
        return response;
    }

    @Override
    public CitizenResponseDto fetchCitizen(Long id) {
        Citizen citizen = citizenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Citizen", "id", String.valueOf(id)));
        
        return CitizenMapper.toResponseDto(citizen);
    }

    @Override
    public CitizenResponseDto createCitizen(CitizenCreateDto citizenCreateDto) {
        
        validateDniNotTaken(citizenCreateDto.getDni(), null);

        Citizen citizen = CitizenMapper.toEntity(citizenCreateDto);
        Citizen savedCitizen = citizenRepository.save(citizen);

        return CitizenMapper.toResponseDto(savedCitizen);
    }

    @Override
    public CitizenResponseDto updateCitizen(Long id, CitizenCreateDto citizenCreateDto) {
        
        Citizen citizen = citizenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Citizen", "id", String.valueOf(id)));

        validateDniNotTaken(citizenCreateDto.getDni(), id);

        CitizenMapper.updateEntity(citizen, citizenCreateDto);

        Citizen updatedCitizen = citizenRepository.save(citizen);
        
        return CitizenMapper.toResponseDto(updatedCitizen);
    }

    @Override
    public void deleteCitizen(Long id) {
        Citizen citizen = citizenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Citizen", "id", String.valueOf(id)));
        
        citizenRepository.delete(citizen);
    }

    // ==========================================
    // Private validation helpers
    // ==========================================

    private void validateDniNotTaken(String dni, Long excludeCitizenId) {
        citizenRepository.findByDni(dni).ifPresent(existing -> {
            if (excludeCitizenId == null || !existing.getId().equals(excludeCitizenId)) {
                throw new ResourceAlreadyExistsException("Citizen with DNI " + dni + " already exists.");
            }
        });
    }
}