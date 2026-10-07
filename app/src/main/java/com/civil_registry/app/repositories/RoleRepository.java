package com.civil_registry.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.civil_registry.app.models.entities.Role;

@Repository 
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRolName(String rolName);
    
}
