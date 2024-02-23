package com.backend.integration.Dto.Request;

public class CheckAvailabilityRequest {
    private String username;
    private String email;
    private String phoneNumber;

    // Getter and Setter

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Constructors
    public CheckAvailabilityRequest(String username) {
        this.username = username;
    }

    public CheckAvailabilityRequest(String username, String email) {
        this.username = username;
        this.email = email;
    }

    //Add constructor for phone number
}
