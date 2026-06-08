package com.civil_registry.app.models.dto;

import java.time.LocalDate;

import com.civil_registry.app.enums.Gender;

public class CitizenCreateDto {
    
    private String dni;
    private String name;
    private String fatherLastName;
    private String motherLastName;
    private LocalDate birthDate;
    private Gender gender;

    public CitizenCreateDto() {
    }

    public CitizenCreateDto(String dni, String name, String fatherLastName, String motherLastName, LocalDate birthDate, Gender gender) {
        this.dni = dni;
        this.name = name;
        this.fatherLastName = fatherLastName;
        this.motherLastName = motherLastName;
        this.birthDate = birthDate;
        this.gender = gender;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFatherLastName() {
        return fatherLastName;
    }

    public void setFatherLastName(String fatherLastName) {
        this.fatherLastName = fatherLastName;
    }

    public String getMotherLastName() {
        return motherLastName;
    }

    public void setMotherLastName(String motherLastName) {
        this.motherLastName = motherLastName;
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

    @Override
    public String toString() {
        return "CitizenDto [dni=" + dni + ", name=" + name + ", fatherLastName=" + fatherLastName + ", motherLastName="
                + motherLastName + ", birthDate=" + birthDate + ", gender=" + gender + "]";
    }
}
