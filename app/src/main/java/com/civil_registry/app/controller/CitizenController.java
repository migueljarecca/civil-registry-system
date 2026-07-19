package com.civil_registry.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.civil_registry.app.services.ICitizenService;

@RestController
@RequestMapping(path = "/citizens", produces = {MediaType.APPLICATION_JSON_VALUE})
public class CitizenController {
    
    @Autowired
    private ICitizenService iCitizenService;

    @GetMapping
    public ResponseEntity<List<CitizenResponseDto>>fetchAllCitizens() {

        List<CitizenResponseDto> citizens = iCitizenService.fetchAllCitizens();
        
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(citizens);
    }

    @PostMapping
    public ResponseEntity<ResponseDto>createCitizen(@RequestBody CitizenCreateDto citizenCreateDto) {

        System.out.println("CitizenController.createCitizen: " + citizenCreateDto);
        
        iCitizenService.createCitizen(citizenCreateDto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ResponseDto(CitizenConstants.STATUS_201, CitizenConstants.MESSAGE_201));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitizenResponseDto>fetchCitizen(@PathVariable Long id) {

        CitizenResponseDto citizenResponseDto = iCitizenService.fetchCitizen(id);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(citizenResponseDto);

    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDto>updateCitizen(@PathVariable Long id, @RequestBody CitizenCreateDto citizenCreateDto) {

        boolean isUpdated = iCitizenService.updateCitizen(id, citizenCreateDto);

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

        boolean isDeleted = iCitizenService.deleteCitizen(id);

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
