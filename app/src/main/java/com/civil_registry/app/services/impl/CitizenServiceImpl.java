package com.civil_registry.app.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.civil_registry.app.exception.CitizenAlreadyExistsException;
import com.civil_registry.app.exception.ResourceNotFoundException;
import com.civil_registry.app.models.dto.CitizenCreateDto;
import com.civil_registry.app.models.dto.CitizenResponseDto;
import com.civil_registry.app.models.entities.Citizen;
import com.civil_registry.app.models.mapper.CitizenMapper;
import com.civil_registry.app.repositories.CitizenRepository;
import com.civil_registry.app.services.ICitizenService;

@Service
public class CitizenServiceImpl implements ICitizenService {

    @Autowired
    private CitizenRepository citizenRepository;


    /**
     *
     * @return List of all citizens
     */
    @Override
    public List<CitizenResponseDto> fetchAllCitizens() {

        List<Citizen> citizens = citizenRepository.findAll();

        List<CitizenResponseDto> response = new ArrayList<>();

        for (Citizen citizen : citizens) {
            response.add(CitizenMapper.toCitizenResponseDto(citizen));
        }

        return response;
    }

    /**
     *
     * @param citizen -Citizen Object
     * @return the new citizen details
     */
    @Override
    public void createCitizen(CitizenCreateDto citizenCreateDto) {
        
        Citizen citizen = CitizenMapper.createCitizenFromDto(citizenCreateDto);

        Optional<Citizen> opCitizen = citizenRepository.findByDni(citizen.getDni());

        if (opCitizen.isPresent()) {
            throw new CitizenAlreadyExistsException("Citizen with DNI " + citizen.getDni() + " already exists");
        }

        citizenRepository.save(citizen);
    }



    /**
     *
     * @param id - input id
     * @return Citizen details based on a given id
     */
    @Override
    public CitizenResponseDto fetchCitizen(Long id) {

        Citizen citizen = citizenRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Citizen", "id", id)
        );

        CitizenResponseDto citizenResponseDto = CitizenMapper.toCitizenResponseDto(citizen);

        return citizenResponseDto;
    }


    /**
     *
     * @param citizenCreateDto - CitizenCreateDto Object
     * @return boolean indicating if the update of citizen details is successful or not
     */
    @Override
    public boolean updateCitizen(Long id, CitizenCreateDto citizenCreateDto) {
        
        Citizen citizen = citizenRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Citizen", "id", id)
        );

        CitizenMapper.updateCitizenFromDto(citizen, citizenCreateDto);

        citizenRepository.save(citizen);

        return true;
    }


    /**
     * @param id - Input Id
     * @return boolean indicating if the delete of citizen details is successful or not
    */
    @Override
    public boolean deleteCitizen(Long id) {

        Citizen citizen = citizenRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Citizen", "id", id)
        );

        citizenRepository.deleteById(citizen.getId());
        return true;
    }

    
    
}
