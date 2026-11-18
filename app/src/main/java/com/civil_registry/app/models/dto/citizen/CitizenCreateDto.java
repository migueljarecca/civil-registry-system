package com.civil_registry.app.models.dto.citizen;

import java.time.LocalDate;

import com.civil_registry.app.enums.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CitizenCreateDto {

    @NotBlank(message = "Name is required")
    @Size(max = 50)
    private String name;

    @NotBlank(message = "Lastname is required")
    @Size(max = 50)
    private String lastname;

    @NotBlank(message = "Mother lastname is required")
    @Size(max = 50)
    private String motherLastname;

    @NotBlank(message = "DNI is required")
    @Pattern(regexp = "\\d{8}", message = "DNI must be exactly 8 digits")
    private String dni;

    @NotNull(message = "Birth date is required")
    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;

    @NotNull(message = "Gender is required")
    private Gender gender;


    public String getName() {
        return name;
    }


    public CitizenCreateDto( String name, String lastname, String motherLastname, 
                                String dni, LocalDate birthDate, Gender gender) {
        this.name = name;
        this.lastname = lastname;
        this.motherLastname = motherLastname;
        this.dni = dni;
        this.birthDate = birthDate;
        this.gender = gender;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getLastname() {
        return lastname;
    }


    public void setLastname(String lastname) {
        this.lastname = lastname;
    }


    public String getMotherLastname() {
        return motherLastname;
    }


    public void setMotherLastname(String motherLastname) {
        this.motherLastname = motherLastname;
    }


    public String getDni() {
        return dni;
    }


    public void setDni(String dni) {
        this.dni = dni;
    }


    public LocalDate getBirthDate() {
        return birthDate;
    }


    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }


    public Gender getGender() {
        return gender;
    }


    public void setGender(Gender gender) {
        this.gender = gender;
    }

    
}