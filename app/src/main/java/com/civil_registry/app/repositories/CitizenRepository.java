package com.civil_registry.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.civil_registry.app.models.entities.Citizen;

@Repository
public interface CitizenRepository extends JpaRepository<Citizen, Long>{

    public Optional<Citizen> findByDni(String dni);
}
