package com.civil_registry.app.auth.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.civil_registry.app.auth.userdetails.CustomUserDetails;
import com.civil_registry.app.models.entities.User;
import com.civil_registry.app.repositories.UserRepository;

@Service 
public class CustomUserDetailsService implements UserDetailsService{

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        String normalizedEmail = email.toLowerCase().trim();

        User user = userRepository.findByEmailWithRoles(normalizedEmail)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with email: " + normalizedEmail));

        return new CustomUserDetails(user);
    }

}
