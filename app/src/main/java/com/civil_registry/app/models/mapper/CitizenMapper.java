package com.civil_registry.app.models.mapper;

import com.civil_registry.app.models.dto.citizen.CitizenCreateDto;
import com.civil_registry.app.models.dto.citizen.CitizenResponseDto;
import com.civil_registry.app.models.entities.Citizen;

public class CitizenMapper {

    public static Citizen toEntity(CitizenCreateDto dto) {
        Citizen citizen = new Citizen();
        citizen.setFirstName(dto.getFirstName());
        citizen.setSecondName(dto.getSecondName());
        citizen.setThirdName(dto.getThirdName());
        citizen.setFatherLastname(dto.getFatherLastname());
        citizen.setMotherLastname(dto.getMotherLastname());
        citizen.setDni(dto.getDni());
        citizen.setBirthDate(dto.getBirthDate());
        citizen.setGender(dto.getGender());
        return citizen;
    }

    public static void updateEntity(Citizen citizen, CitizenCreateDto dto) {
        citizen.setFirstName(dto.getFirstName());
        citizen.setSecondName(dto.getSecondName());
        citizen.setThirdName(dto.getThirdName());
        citizen.setFatherLastname(dto.getFatherLastname());
        citizen.setMotherLastname(dto.getMotherLastname());
        citizen.setDni(dto.getDni());
        citizen.setBirthDate(dto.getBirthDate());
        citizen.setGender(dto.getGender());
    }    

    public static CitizenResponseDto toResponseDto(Citizen citizen) {
        return new CitizenResponseDto(
            
                citizen.getId(),
                citizen.getFirstName(),
                citizen.getSecondName(),
                citizen.getThirdName(),
                citizen.getFatherLastname(),
                citizen.getMotherLastname(),
                citizen.getDni(),
                citizen.getBirthDate(),
                citizen.getGender(),

                citizen.getCreatedAt(),
                citizen.getCreatedBy(),
                citizen.getUpdatedAt(),
                citizen.getUpdatedBy()
        );
    }
}