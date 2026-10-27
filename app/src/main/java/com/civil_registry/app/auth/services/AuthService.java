package com.civil_registry.app.auth.services;

import org.springframework.stereotype.Service;

import com.civil_registry.app.auth.dto.RegisterDto;
import com.civil_registry.app.models.dto.user.UserCreateDto;
import com.civil_registry.app.models.dto.user.UserResponseDto;
import com.civil_registry.app.services.UserService;

@Service 
public class AuthService {
    
    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public UserResponseDto register(RegisterDto registerDto) {

        UserCreateDto createDto = new UserCreateDto(
                registerDto.getName(),
                registerDto.getLastname(),
                registerDto.getDni(),
                registerDto.getEmail(),
                registerDto.getPassword()
        );

        return userService.createUser(createDto);
    }

}
