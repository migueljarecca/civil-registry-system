package com.civil_registry.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.civil_registry.app.models.entities.User;

@Repository 
public interface UserRepository extends JpaRepository<User, Long> {
    
    public Optional<User> findByDni(String dni);

    public Optional<User> findByEmail(String email); 
}
