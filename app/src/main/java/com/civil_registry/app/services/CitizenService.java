package com.civil_registry.app.services;

import java.util.List;

import com.civil_registry.app.models.dto.citizen.CitizenCreateDto;
import com.civil_registry.app.models.dto.citizen.CitizenResponseDto;

public interface CitizenService {

    List<CitizenResponseDto> fetchAllCitizens();

    CitizenResponseDto fetchCitizen(Long id);

    CitizenResponseDto createCitizen(CitizenCreateDto citizenCreateDto);

    CitizenResponseDto updateCitizen(Long id, CitizenCreateDto citizenCreateDto);

    void deleteCitizen(Long id);
}