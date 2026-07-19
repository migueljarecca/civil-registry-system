package com.civil_registry.app.models.mapper;

import com.civil_registry.app.models.dto.CitizenCreateDto;
import com.civil_registry.app.models.dto.CitizenResponseDto;
import com.civil_registry.app.models.entities.Citizen;

public class CitizenMapper {
    
    public static Citizen createCitizenFromDto(CitizenCreateDto citizenCreateDto) {
    
        Citizen citizen = new Citizen();

        citizen.setDni(citizenCreateDto.getDni());
        citizen.setName(citizenCreateDto.getName());
        citizen.setFatherLastName(citizenCreateDto.getFatherLastName());
        citizen.setMotherLastName(citizenCreateDto.getMotherLastName());
        citizen.setBirthDate(citizenCreateDto.getBirthDate());
        citizen.setGender(citizenCreateDto.getGender());

        return citizen;
    }


    public static void updateCitizenFromDto(Citizen citizen, CitizenCreateDto dto) {

        citizen.setDni(dto.getDni());
        citizen.setName(dto.getName());
        citizen.setFatherLastName(dto.getFatherLastName());
        citizen.setMotherLastName(dto.getMotherLastName());
        citizen.setBirthDate(dto.getBirthDate());
        citizen.setGender(dto.getGender());

    }

    public static CitizenResponseDto toCitizenResponseDto(Citizen citizen) {
    
        CitizenResponseDto citizenResponseDto = new CitizenResponseDto(
            citizen.getId(),
            citizen.getDni(),
            citizen.getName(),
            citizen.getFatherLastName(),
            citizen.getMotherLastName(),
            citizen.getBirthDate(),
            citizen.getGender()
        );

        return citizenResponseDto;
    }
}
