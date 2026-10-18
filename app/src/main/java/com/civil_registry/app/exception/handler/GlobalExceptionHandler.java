package com.civil_registry.app.exception.handler;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.civil_registry.app.exception.citizen.CitizenDniModificationException;
import com.civil_registry.app.exception.common.ResourceAlreadyExistsException;
import com.civil_registry.app.exception.common.ResourceNotFoundException;
import com.civil_registry.app.exception.filedocument.FileDocumentAlreadyAssignedException;
import com.civil_registry.app.models.dto.ErrorResponseDto;
import com.civil_registry.app.models.dto.ValidationErrorResponseDto;

@ControllerAdvice
public class GlobalExceptionHandler {


    // ==========================================
    // Security exceptions
    // ==========================================

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDto> handleAccessDeniedException(
            AccessDeniedException exception,
            WebRequest webRequest) {

        ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.FORBIDDEN,
                "Access denied: you don't have permission to access this resource",
                LocalDateTime.now()
        );

        return new ResponseEntity<>(errorResponseDto, HttpStatus.FORBIDDEN);
    }


    // ==========================================
    // Validation exceptions
    // ==========================================

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponseDto> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exception,
            WebRequest webRequest) {

        List<ValidationErrorResponseDto.FieldError> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new ValidationErrorResponseDto.FieldError(
                        error.getField(),
                        error.getDefaultMessage()
                ))
                .collect(Collectors.toList());

        ValidationErrorResponseDto errorResponse = new ValidationErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.BAD_REQUEST,
                "Validation failed",
                errors,
                LocalDateTime.now()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }


    // ==========================================
    // Common resource exceptions
    // ==========================================

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDto>handleResourceAlreadyExistsException(
            ResourceAlreadyExistsException exception,
            WebRequest webRequest){

            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.CONFLICT,
                exception.getMessage(),
                LocalDateTime.now()
            );

            return new ResponseEntity<>(errorResponseDto, HttpStatus.CONFLICT);
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
       

    // ==========================================
    // Citizen exceptions
    // ==========================================    

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


    // ==========================================
    // FileDocument exceptions
    // ==========================================

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

    // ==========================================
    // Fallback handler
    // ==========================================

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

}
