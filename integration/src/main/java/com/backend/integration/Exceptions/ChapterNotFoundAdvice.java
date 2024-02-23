package com.backend.integration.Exceptions; 

import java.util.HashMap; 
import java.util.Map; 

import org.springframework.http.HttpStatus; 
import org.springframework.web.bind.annotation.ControllerAdvice; 
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody; 
import org.springframework.web.bind.annotation.ResponseStatus; 

@ControllerAdvice // Marks the class as an advice for controllers
public class ChapterNotFoundAdvice {

    @ResponseBody // Indicates that the return value of the method should be written directly to the body of the HTTP response
    @ExceptionHandler(ChapterNotFoundException.class) // Specifies the exception to handle
    @ResponseStatus(HttpStatus.NOT_FOUND) // Sets the HTTP status code to 404 (NOT FOUND)
    public Map<String, String> ExceptionHandler(ChapterNotFoundException exception){
        Map<String, String> errorMap = new HashMap<>(); // Creates a new HashMap to store error information
        errorMap.put("errorMessage", exception.getMessage()); // Adds the error message to the map

        return errorMap; // Returns the map containing error information
    }
}
