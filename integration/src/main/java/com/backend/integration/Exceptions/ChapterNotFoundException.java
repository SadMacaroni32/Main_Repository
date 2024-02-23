package com.backend.integration.Exceptions;

public class ChapterNotFoundException extends RuntimeException { // Definition of the ChapterNotFoundException class, extending RuntimeException

    // Constructor for ChapterNotFoundException class
    public ChapterNotFoundException(Long chapter_id) { // Constructor with a parameter of type Long representing the chapter ID
        super("Could not find the chapter with id " + chapter_id); // Calls the constructor of the superclass (RuntimeException) with an error message
    } 

}
