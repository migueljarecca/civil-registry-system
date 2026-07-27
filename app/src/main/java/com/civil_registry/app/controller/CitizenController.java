package com.civil_registry.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.civil_registry.app.constants.CitizenConstants;
import com.civil_registry.app.models.dto.CitizenCreateDto;
import com.civil_registry.app.models.dto.CitizenResponseDto;
import com.civil_registry.app.models.dto.ResponseDto;
import com.civil_registry.app.services.CitizenService;

@RestController
@RequestMapping(path = "/citizens", produces = {MediaType.APPLICATION_JSON_VALUE})
public class CitizenController {

    private final CitizenService citizenService;

    public CitizenController(CitizenService iCitizenService) {
        this.citizenService = iCitizenService;
    }


    @GetMapping
    public ResponseEntity<List<CitizenResponseDto>>fetchAllCitizens() {

        List<CitizenResponseDto> citizens = citizenService.fetchAllCitizens();
        
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(citizens);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CitizenResponseDto>fetchCitizen(@PathVariable Long id) {

        CitizenResponseDto citizenResponseDto = citizenService.fetchCitizen(id);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(citizenResponseDto);

    }

    @PostMapping
    public ResponseEntity<ResponseDto>createCitizen(@RequestBody CitizenCreateDto citizenCreateDto) {

        citizenService.createCitizen(citizenCreateDto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ResponseDto(CitizenConstants.STATUS_201, CitizenConstants.MESSAGE_201));
    }



    @PutMapping("/{id}")
    public ResponseEntity<ResponseDto>updateCitizen(@PathVariable Long id, @RequestBody CitizenCreateDto citizenCreateDto) {

        boolean isUpdated = citizenService.updateCitizen(id, citizenCreateDto);

        if (isUpdated) {
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(CitizenConstants.STATUS_200, CitizenConstants.MESSAGE_200));
        } else {
            return ResponseEntity
            .status(HttpStatus.EXPECTATION_FAILED)
            .body(new ResponseDto(CitizenConstants.STATUS_417, CitizenConstants.MESSAGE_417_UPDATE));
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto>deleteCitizen(@PathVariable Long id) {

        boolean isDeleted = citizenService.deleteCitizen(id);

        if (isDeleted) {
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(CitizenConstants.STATUS_200, CitizenConstants.MESSAGE_200));
        } else {
            return ResponseEntity
            .status(HttpStatus.EXPECTATION_FAILED)
            .body(new ResponseDto(CitizenConstants.STATUS_417, CitizenConstants.MESSAGE_417_DELETE));
        }

    }
}
