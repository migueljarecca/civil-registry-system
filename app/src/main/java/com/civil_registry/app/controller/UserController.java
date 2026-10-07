package com.civil_registry.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civil_registry.app.constants.UserConstants;
import com.civil_registry.app.models.dto.ResponseDto;
import com.civil_registry.app.models.dto.user.UserCreateDto;
import com.civil_registry.app.models.dto.user.UserResponseDto;
import com.civil_registry.app.services.UserService;


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
    public ResponseEntity<UserResponseDto> fetchUser(@PathVariable Long id) {

        UserResponseDto userResponseDto = userService.fetchUser(id);

        return ResponseEntity
            .ok()
            .body(userResponseDto);
    }    


    @PostMapping 
    public ResponseEntity<ResponseDto> createUser(@RequestBody UserCreateDto userCreateDto) {
        
        userService.createUser(userCreateDto);
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ResponseDto(UserConstants.STATUS_201, UserConstants.MESSAGE_201));
    }


    @PutMapping ("/{id}")
    public ResponseEntity<ResponseDto> updateUser(@PathVariable Long id, @RequestBody UserCreateDto userCreateDto) {
        
        userService.updateUser(id, userCreateDto);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ResponseDto(UserConstants.STATUS_200, UserConstants.MESSAGE_200));

    }


    @DeleteMapping ("/{id}")
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ResponseDto(UserConstants.STATUS_200, UserConstants.MESSAGE_200));

    }
}

