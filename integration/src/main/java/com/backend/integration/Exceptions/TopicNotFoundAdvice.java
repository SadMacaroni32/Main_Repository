package com.backend.integration.Exceptions;

import java.util.HashMap; 
import java.util.Map; 

import org.springframework.http.HttpStatus; 
import org.springframework.web.bind.annotation.ExceptionHandler; 
import org.springframework.web.bind.annotation.ResponseBody; 
import org.springframework.web.bind.annotation.ResponseStatus;

public class TopicNotFoundAdvice {
    // Indicates that the return value of the method should be written directly to the body of the HTTP response
    @ResponseBody
    // Specifies that this method handles exceptions of type TopicNotFoundException
    @ExceptionHandler(TopicNotFoundException.class)
    // Sets the HTTP response status code to 404 (NOT FOUND)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> ExceptionHandler(TopicNotFoundException exception) {
        // Creates a new HashMap to store error information
        Map<String, String> errorMap = new HashMap<>();
        // Adds the error message from the exception to the map with the key "errorMessage"
        errorMap.put("errorMessage", exception.getMessage());
        // Returns the map containing the error message
        return errorMap;
    }
}
