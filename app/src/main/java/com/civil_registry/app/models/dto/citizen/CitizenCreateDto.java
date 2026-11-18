package com.civil_registry.app.models.dto.citizen;

import java.time.LocalDate;

import com.civil_registry.app.enums.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CitizenCreateDto {

    @NotBlank(message = "First name is required")
    @Size(max = 50)
    private String firstName;

    @NotBlank(message = "Second name is required")
    @Size(max = 50)
    private String secondName;

    @Size(max = 50)
    private String thirdName;

    @NotBlank(message = "Father lastname is required")
    @Size(max = 50)
    private String fatherLastname;

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

    
    public CitizenCreateDto() {
    }


    public CitizenCreateDto(String firstName,
            String secondName,
            String thirdName,
            String fatherLastname,
            String motherLastname,
            String dni,
            LocalDate birthDate,
            Gender gender) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.thirdName = thirdName;
        this.fatherLastname = fatherLastname;
        this.motherLastname = motherLastname;
        this.dni = dni;
        this.birthDate = birthDate;
        this.gender = gender;
    }


    public String getFirstName() {
        return firstName;
    }


    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getSecondName() {
        return secondName;
    }


    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }


    public String getThirdName() {
        return thirdName;
    }


    public void setThirdName(String thirdName) {
        this.thirdName = thirdName;
    }


    public String getFatherLastname() {
        return fatherLastname;
    }


    public void setFatherLastname(String fatherLastname) {
        this.fatherLastname = fatherLastname;
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