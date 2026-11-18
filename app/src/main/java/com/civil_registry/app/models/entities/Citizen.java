package com.civil_registry.app.models.entities;

import java.time.LocalDate;

import com.civil_registry.app.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "citizens", uniqueConstraints = {
        @UniqueConstraint(columnNames = "dni")
})
public class Citizen extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String secondName;

    @Column(length = 50)
    private String thirdName;

    @Column(nullable = false, length = 50)
    private String fatherLastname;

    @Column(nullable = false, length = 50)
    private String motherLastname;

    @Column(nullable = false, unique = true, length = 8)
    private String dni;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Gender gender;


    public Citizen() {
    }


    public Citizen(Long id, String firstName, String secondName, String thirdName, String fatherLastname,
            String motherLastname, String dni, LocalDate birthDate, Gender gender) {
        this.id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.thirdName = thirdName;
        this.fatherLastname = fatherLastname;
        this.motherLastname = motherLastname;
        this.dni = dni;
        this.birthDate = birthDate;
        this.gender = gender;
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
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

