package com.civil_registry.app.services;

import java.util.List;

import com.civil_registry.app.models.dto.user.UserCreateDto;
import com.civil_registry.app.models.dto.user.UserResponseDto;

public interface UserService {

    /**
     * @return List of all users
     */
    List<UserResponseDto> fetchAllUsers();

    /**
     * @param id - input id
     * @return User details based on a given id.
     */
    UserResponseDto fetchUser(Long id);

    /**
     * @param userCreateDto - userCreateDto Object
     */
    void createUser(UserCreateDto userCreateDto);

    /**
     * @param userCreateDto Object
     * @return boolean indicating if the update of user details is successful or not
     */
    void updateUser(Long id, UserCreateDto userCreateDto);

    /**
     * @param id - Input id
     * @return boolean indicating if the delete of User details is successful or not
     */
    void deleteUser(Long id);
}