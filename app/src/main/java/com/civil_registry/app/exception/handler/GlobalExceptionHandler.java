package com.civil_registry.app.exception.handler;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.civil_registry.app.exception.citizen.CitizenDniModificationException;
import com.civil_registry.app.exception.common.ResourceAlreadyExistsException;
import com.civil_registry.app.exception.common.ResourceNotFoundException;
import com.civil_registry.app.exception.filedocument.FileDocumentAlreadyAssignedException;
import com.civil_registry.app.models.dto.ErrorResponseDto;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto>handleGlobalException(Exception exception, WebRequest webRequest){

        ErrorResponseDto errorResponseDto = new ErrorResponseDto(
            webRequest.getDescription(false),
            HttpStatus.INTERNAL_SERVER_ERROR,
            exception.getMessage(),
            LocalDateTime.now()
        );

        return new ResponseEntity<>(errorResponseDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDto>handleCitizenAlreadyExistsException(
            ResourceAlreadyExistsException exception,
            WebRequest webRequest){

            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.BAD_REQUEST,
                exception.getMessage(),
                LocalDateTime.now()
            );

            return new ResponseEntity<>(errorResponseDto, HttpStatus.BAD_REQUEST);
        }
    

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDto>handleResourceNotFoundException(
            ResourceNotFoundException exception,
            WebRequest webRequest){

            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.NOT_FOUND,
                exception.getMessage(),
                LocalDateTime.now()
            );

            return new ResponseEntity<>(errorResponseDto, HttpStatus.NOT_FOUND);
        }
       
        
    @ExceptionHandler(CitizenDniModificationException.class)
    public ResponseEntity<ErrorResponseDto>handleCitizenDniModificationException(
            CitizenDniModificationException exception,
            WebRequest webRequest){

            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.BAD_REQUEST,
                exception.getMessage(),
                LocalDateTime.now()
            );

        return new ResponseEntity<>(errorResponseDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FileDocumentAlreadyAssignedException.class)
    public ResponseEntity<ErrorResponseDto>handleFileDocumentAlreadyAssignedException(
            FileDocumentAlreadyAssignedException exception,
            WebRequest webRequest){

            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.CONFLICT,
                exception.getMessage(),
                LocalDateTime.now()
            );

        return new ResponseEntity<>(errorResponseDto, HttpStatus.CONFLICT);
    }
}
