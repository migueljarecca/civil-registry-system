package com.civil_registry.app.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civil_registry.app.auth.userdetails.CustomUserDetails;
import com.civil_registry.app.constants.UserConstants;
import com.civil_registry.app.models.dto.ResponseDto;
import com.civil_registry.app.models.dto.user.ChangePasswordDto;
import com.civil_registry.app.models.dto.user.ResetPasswordResponseDto;
import com.civil_registry.app.models.dto.user.UserCreateDto;
import com.civil_registry.app.models.dto.user.UserResponseDto;
import com.civil_registry.app.models.dto.user.UserUpdateDto;
import com.civil_registry.app.services.UserService;

import jakarta.validation.Valid;


@RestController 
@RequestMapping (path = "/users", produces = {MediaType.APPLICATION_JSON_VALUE})
public class UserController {

    private final UserService userService;

    public UserController(UserService iUserService) {
        this.userService = iUserService;
    }


    @GetMapping 
    public ResponseEntity<List<UserResponseDto>> fetchAllUsers() {

        List<UserResponseDto> users = userService.fetchAllUsers();

        return ResponseEntity
            .ok()
            .body(users);
    }
    

    @GetMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.user.id or hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> fetchUser(@PathVariable Long id) {

        UserResponseDto userResponseDto = userService.fetchUser(id);

        return ResponseEntity
            .ok()
            .body(userResponseDto);
    }    


    @PostMapping 
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody UserCreateDto userCreateDto) {
        
        UserResponseDto created = userService.createUser(userCreateDto);
        URI location = URI.create("/users/" + created.id());

        return ResponseEntity
            .created(location)
            .body(created);
    }


    @PutMapping ("/{id}")
    @PreAuthorize("#id == authentication.principal.user.id or hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, 
                                                    @Valid @RequestBody UserUpdateDto userUpdateDto) {
        
        UserResponseDto updated = userService.updateUser(id, userUpdateDto);

        return ResponseEntity
            .ok()
            .body(updated);
    }


    @PutMapping("/me/password")
    public ResponseEntity<ResponseDto> changeMyPassword(@Valid @RequestBody ChangePasswordDto changePasswordDto,
                                                        Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getUser().getId();

        userService.changePassword(userId, changePasswordDto);

        return ResponseEntity.ok(new ResponseDto(UserConstants.STATUS_200, "Password changed successfully"));
    }    


    @PostMapping("/{id}/reset-password")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResetPasswordResponseDto> resetPassword(@PathVariable Long id) {

        ResetPasswordResponseDto response = userService.resetPassword(id);

        return ResponseEntity
            .ok()
            .body(response);
    }
    
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ResponseDto(UserConstants.STATUS_200, UserConstants.MESSAGE_200));

    }
}

