package com.authentication.userAuthentication.Dto.Request;

import javax.validation.constraints.Size;

public class UpdateUserDto {

    @Size(max = 255, message = "First name cannot exceed 255 characters")
    private String firstName;

    @Size(max = 255, message = "Last name cannot exceed 255 characters")
    private String lastName;

    @Size(max = 30, message = "Username cannot exceed 30 characters")
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    // Add getters and setters for additional fields
}