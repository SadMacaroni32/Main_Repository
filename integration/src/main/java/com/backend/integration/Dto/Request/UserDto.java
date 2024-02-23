package com.backend.integration.Dto.Request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.backend.integration.Entity.Enums.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long user_id;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty(message = "Email should not be empty")
    @Email
    private String email;

    @NotEmpty(message = "Phone number should not be empty")
    private String phoneNumber;

    @NotEmpty(message = "Password should not be empty")
    private String password;

    private String username;

    private Role role;

    private byte[] profilePicture;

    private byte[] signatureData;

    private boolean isVerified; // Add the isVerified field

    // Other fields and methods...

    // Add getter and setter for isVerified
    public boolean isVerified() {
        return isVerified;
    }   

    public void setVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }

    // Add getter and setter for username
    public String getUsername() {
        return username;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String setPhoneNumber() {
        return phoneNumber;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
}
