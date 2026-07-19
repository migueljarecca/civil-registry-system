package com.civil_registry.app.services;

import java.util.List;

import com.civil_registry.app.models.dto.CitizenCreateDto;
import com.civil_registry.app.models.dto.CitizenResponseDto;

public interface ICitizenService {

    /**
     * 
     * @return List of all citizens
     */
    List<CitizenResponseDto> fetchAllCitizens();
    
    /**
     * @param citizenCreateDto - citizenCreateDto Object
     */
    void createCitizen(CitizenCreateDto citizenCreateDto);
    

    /**
     * @param id - input id
     * @return Citizen details based on a given id.
     */
    CitizenResponseDto fetchCitizen(Long id);


    /**
     *
     * @param citizenCreateDto Object
     * @return boolean indicating if the update of citizen details if successful or not
     */
    boolean updateCitizen(Long id, CitizenCreateDto citizenCreateDto);


    /**
     *
     * @param id - Input id
     * @return boolean indicating if the delete of Citizen details is successful or not
     */
    boolean deleteCitizen(Long id);
}
