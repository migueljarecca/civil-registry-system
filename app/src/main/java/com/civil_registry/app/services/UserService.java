package com.civil_registry.app.services;

import java.util.List;

import com.civil_registry.app.models.dto.user.ChangePasswordDto;
import com.civil_registry.app.models.dto.user.ResetPasswordResponseDto;
import com.civil_registry.app.models.dto.user.UserCreateDto;
import com.civil_registry.app.models.dto.user.UserResponseDto;
import com.civil_registry.app.models.dto.user.UserUpdateDto;

public interface UserService {

    /**
     * Retrieves all users.
     *
     * @return List of UserResponseDto containing all users
     */
    List<UserResponseDto> fetchAllUsers();

    /**
     * Retrieves a user by ID.
     *
     * @param id - ID of the user to retrieve
     * @return UserResponseDto containing the user details
     */
    UserResponseDto fetchUser(Long id);

    /**
     * Creates a new user.
     *
     * @param userCreateDto - user data to create
     * @return UserResponseDto containing the created user details
     */
    UserResponseDto createUser(UserCreateDto userCreateDto);

    /**
     * Updates an existing user.
     *
     * @param id - ID of the user to update
     * @param userUpdateDto - user data to update
     * @return UserResponseDto containing the updated user details
     */
    UserResponseDto updateUser(Long id, UserUpdateDto userCreateDto);


    /**
     * Changes the password for a user.
     *
     * @param id - ID of the user whose password to change
     * @param changePasswordDto - new password data
     */
    void changePassword(Long id, ChangePasswordDto changePasswordDto);


    /**
     * Changes the password for a admin by generating a temporary password.
     * 
     * @param id - ID of the user whose password to reset
     */
    ResetPasswordResponseDto resetPassword(Long id);

    /**
     * Deletes a user by ID.
     *
     * @param id - ID of the user to delete
     */
    void deleteUser(Long id);
}