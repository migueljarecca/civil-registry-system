package com.civil_registry.app.services.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.civil_registry.app.exception.common.ResourceAlreadyExistsException;
import com.civil_registry.app.exception.common.ResourceNotFoundException;
import com.civil_registry.app.models.dto.user.UserCreateDto;
import com.civil_registry.app.models.dto.user.UserResponseDto;
import com.civil_registry.app.models.entities.Role;
import com.civil_registry.app.models.entities.User;
import com.civil_registry.app.models.mapper.UserMapper;
import com.civil_registry.app.repositories.RoleRepository;
import com.civil_registry.app.repositories.UserRepository;
import com.civil_registry.app.services.UserService;

@Service 
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }


    /**
     * Retrieves all registered users.
     *
     * @return list of {@link UserResponseDto}; empty if no users exist.
     */
    @Override
    public List<UserResponseDto> fetchAllUsers() {

        List<User> users = userRepository.findAll();
        
        List<UserResponseDto> response = new ArrayList<>();

        for (User user : users) {
            response.add(UserMapper.toUserResponseDto(user));
        }

        return response;
    }


    /**
     * Retrieves a user by its ID.
     *
     * @param id identifier of the user.
     * @return the user data.
     * @throws ResourceNotFoundException if no user exists with the given ID.
     */
    @Override
    public UserResponseDto fetchUser(Long id) {

        User user = userRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", String.valueOf(id))
        );

        UserResponseDto userResponseDto = UserMapper.toUserResponseDto(user);

        return userResponseDto;
    }


    /**
     * Creates a new user in the system with the default {@code ROLE_USER} role.
     *
     * @param userCreateDto data of the user to create.
     * @throws ResourceAlreadyExistsException if the DNI or email is already registered.
     * @throws ResourceNotFoundException if the {@code ROLE_USER} role does not exist.
     */
    @Override
    public void createUser(UserCreateDto userCreateDto) {

        User user = UserMapper.createUserFromDto(userCreateDto);

        validateDniNotTaken(user.getDni(), null);
        validateEmailNotTaken(user.getEmail(), null);

        Role existingRole = roleRepository.findByRolName("ROLE_USER")
                .orElseThrow(() -> 
                        new ResourceNotFoundException("Role", "rolName", "ROLE_USER")
        );

        Set<Role> roles = new HashSet<>();
        roles.add(existingRole);
        user.setRoles(roles);

        userRepository.save(user);
    }


    /**
     * Updates an existing user's data.
     *
     * @param id identifier of the user to update.
     * @param userCreateDto new user data.
     * @throws ResourceNotFoundException if no user exists with the given ID.
     * @throws ResourceAlreadyExistsException if the DNI or email already belongs to another user.
     */  
    @Override
    public void updateUser(Long id, UserCreateDto userCreateDto) {
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> 
                        new ResourceNotFoundException("User", "id", String.valueOf(id)));

        validateDniNotTaken(userCreateDto.getDni(), id);
        validateEmailNotTaken(userCreateDto.getEmail(), id);                       

        UserMapper.updateUserFromDto(user, userCreateDto);
        
        userRepository.save(user);

    }


    /**
     * Deletes a user by its ID.
     *
     * @param id identifier of the user to delete.
     * @throws ResourceNotFoundException if no user exists with the given ID.
     */   
    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> 
                        new ResourceNotFoundException("User", "id", String.valueOf(id)));

        userRepository.delete(user);

    }


    // ==========================================
    // Private validation methods
    // ==========================================

    private void validateDniNotTaken(String dni, Long excludeUserId) {

        userRepository.findByDni(dni).ifPresent(existing -> {

            if (excludeUserId == null || !existing.getId().equals(excludeUserId)) {
                throw new ResourceAlreadyExistsException(
                        "User with DNI " + dni + " already exists.");
            }

        });
    }

    private void validateEmailNotTaken(String email, Long excludeUserId) {

        userRepository.findByEmail(email).ifPresent(existing -> {

            if (excludeUserId == null || !existing.getId().equals(excludeUserId)) {
                throw new ResourceAlreadyExistsException(
                        "User with email " + email + " already exists.");
            }

        });
    }  

}


