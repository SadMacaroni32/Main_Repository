package com.backend.integration.Exceptions;

public class CourseNotFoundException extends RuntimeException {
    // Constructor for CourseNotFoundException class
    public CourseNotFoundException(Long course_id) {
        // Calls the constructor of the superclass (RuntimeException) with an error message
        super("Could not find the course with id " + course_id);
    }
}
