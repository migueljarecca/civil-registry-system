package com.civil_registry.app.services;

import com.civil_registry.app.models.dto.user.UserCreateDto;
import com.civil_registry.app.models.dto.user.UserResponseDto;

public interface IUserService {
    
    /**
     * @param citizenCreateDto - citizenCreateDto Object
     */
    void createUser(UserCreateDto userCreateDto);

    /**
     * @param id - input id
     * @return user details based on a given id
     */
    UserResponseDto fetchUser(Long id);
    
    
    boolean updateUser(Long id);
}
