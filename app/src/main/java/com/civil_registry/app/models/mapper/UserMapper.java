package com.civil_registry.app.models.mapper;

import java.util.HashSet;
import java.util.Set;


import com.civil_registry.app.models.dto.user.UserCreateDto;
import com.civil_registry.app.models.dto.user.UserResponseDto;
import com.civil_registry.app.models.entities.Role;
import com.civil_registry.app.models.entities.User;

public class UserMapper {

        public static User createUserFromDto(UserCreateDto userCreateDto) {

        User user = new User();

        user.setName(userCreateDto.getName());
        user.setLastname(userCreateDto.getLastname());
        user.setDni(userCreateDto.getDni());
        user.setEmail(userCreateDto.getEmail());
        user.setPassword(userCreateDto.getPassword());

        return user;
    }


    public static void updateUserFromDto(User user, UserCreateDto dto) {

        user.setName(dto.getName());
        user.setLastname(dto.getLastname());
        user.setDni(dto.getDni());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

    }
    
    
    public static UserResponseDto toUserResponseDto(User user) {

        Set<String> roles = new HashSet<>();

        for (Role role : user.getRoles()) {
            roles.add(role.getRolName());
        }

        UserResponseDto userResponseDto = new UserResponseDto(
            user.getId(),
            user.getName(),
            user.getLastname(),
            user.getDni(),
            user.getEmail(),
            roles,
            user.isEnabled(),

            user.getCreatedAt(),
            user.getCreatedBy(),
            user.getUpdatedAt(),
            user.getUpdatedBy()
        );

        return userResponseDto;
    }    
}
