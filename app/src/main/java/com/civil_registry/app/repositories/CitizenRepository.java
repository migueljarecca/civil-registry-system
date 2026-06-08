package com.civil_registry.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.civil_registry.app.models.entities.Citizen;

@Repository
public interface CitizenRepository extends JpaRepository<Citizen, Long>{

    @Query("SELECT c FROM Citizen c WHERE c.citizenId = :citizenId")
    public Optional<Citizen> findByCitizenId(@Param("id") Long id);
}
