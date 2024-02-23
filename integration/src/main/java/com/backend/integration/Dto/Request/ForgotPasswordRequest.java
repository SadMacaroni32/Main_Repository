package com.backend.integration.Dto.Request;

public class ForgotPasswordRequest {
    private String email;  // You can also use username if preferred

    public ForgotPasswordRequest() {
        // Default constructor for JSON parsing
    }

    public ForgotPasswordRequest(String email) {
        this.email = email;
    }

    // Getter and setter for email

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}