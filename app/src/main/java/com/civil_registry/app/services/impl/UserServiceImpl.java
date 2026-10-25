package com.civil_registry.app.services.impl;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.civil_registry.app.exception.common.InvalidPasswordException;
import com.civil_registry.app.exception.common.ResourceAlreadyExistsException;
import com.civil_registry.app.exception.common.ResourceNotFoundException;
import com.civil_registry.app.models.dto.user.ChangePasswordDto;
import com.civil_registry.app.models.dto.user.ResetPasswordResponseDto;
import com.civil_registry.app.models.dto.user.UserCreateDto;
import com.civil_registry.app.models.dto.user.UserResponseDto;
import com.civil_registry.app.models.dto.user.UserUpdateDto;
import com.civil_registry.app.models.entities.Role;
import com.civil_registry.app.models.entities.User;
import com.civil_registry.app.models.mapper.UserMapper;
import com.civil_registry.app.repositories.RoleRepository;
import com.civil_registry.app.repositories.UserRepository;
import com.civil_registry.app.services.UserService;

@Service 
public class UserServiceImpl implements UserService {

    private static final String TEMP_PASSWORD_CHARS =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    private static final int TEMP_PASSWORD_LENGTH = 12;


    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
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
    public UserResponseDto createUser(UserCreateDto userCreateDto) {

        User user = UserMapper.createUserFromDto(userCreateDto);

        String normalizedEmail = normalizeEmail(userCreateDto.getEmail());

        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(userCreateDto.getPassword()));
        user.setEnabled(true);

        validateDniNotTaken(user.getDni(), null);
        validateEmailNotTaken(normalizedEmail, null);

        Role existingRole = roleRepository.findByRolName("ROLE_USER")
                .orElseThrow(() -> 
                        new ResourceNotFoundException("Role", "rolName", "ROLE_USER")
        );

        Set<Role> roles = new HashSet<>();
        roles.add(existingRole);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        return UserMapper.toUserResponseDto(savedUser);
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
    public UserResponseDto updateUser(Long id, UserUpdateDto userUpdateDto) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", String.valueOf(id)));

    String normalizedEmail = normalizeEmail(userUpdateDto.getEmail());

    validateDniNotTaken(userUpdateDto.getDni(), id);
    validateEmailNotTaken(normalizedEmail, id);

    UserMapper.updateUserFromDto(user, userUpdateDto);
    user.setEmail(normalizedEmail);

    User savedUser = userRepository.save(user);

    return UserMapper.toUserResponseDto(savedUser);
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


    /**
     * Resets the password for a user by generating a temporary password.
     *
     * @param id identifier of the user whose password to reset.
     * @return ResetPasswordResponseDto containing the temporary password and a success message.
     * @throws ResourceNotFoundException if no user exists with the given ID.
     */
    @Override
    public ResetPasswordResponseDto resetPassword(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", String.valueOf(id)));

        String temporaryPassword = generateTemporaryPassword();

        user.setPassword(passwordEncoder.encode(temporaryPassword));
        userRepository.save(user);

        return new ResetPasswordResponseDto(
                user.getEmail(),
                temporaryPassword,
                "Password reset successfully. Provide this temporary password to the user."
        );
    }    

    
    /**
     * Changes the password of an existing user.
     *
     * @param userId - ID of the user whose password will be changed
     * @param changePasswordDto - current and new password data
     */
    @Override
    public void changePassword(Long userId, ChangePasswordDto changePasswordDto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", String.valueOf(userId)));

        if (!passwordEncoder.matches(changePasswordDto.getCurrentPassword(), user.getPassword())) {
            throw new InvalidPasswordException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));

        userRepository.save(user);
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


    private String normalizeEmail(String email) {
        return email == null ? null : email.toLowerCase().trim();
    }


    private String generateTemporaryPassword() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(TEMP_PASSWORD_LENGTH);
        for (int i = 0; i < TEMP_PASSWORD_LENGTH; i++) {
            sb.append(TEMP_PASSWORD_CHARS.charAt(random.nextInt(TEMP_PASSWORD_CHARS.length())));
        }
        return sb.toString();
    }
    

}


