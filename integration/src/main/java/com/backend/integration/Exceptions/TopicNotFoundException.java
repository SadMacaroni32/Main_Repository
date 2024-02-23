package com.backend.integration.Exceptions;

public class TopicNotFoundException extends RuntimeException {
    // Constructor for TopicNotFoundException class
    public TopicNotFoundException(Long topic_id) {
        // Calls the constructor of the superclass (RuntimeException) with an error message
        super("Could not find the topic with id " + topic_id);
    }
}
