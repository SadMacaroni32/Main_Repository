package com.authentication.userAuthentication.Dto.Request;

import com.authentication.userAuthentication.Entity.Enums.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

public record SignUpDto(
        @Email String email,
        @NotBlank @Size(min = 8) String password,
        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank String userName,
        Role role,
        MultipartFile profilePicture
) {
    // Add a getter for email
    public String getEmail() {
        return email;
    }

    public MultipartFile getProfilePicture() {
        return profilePicture;
    }

    public String getUserName() {
        return userName;
    }

    public Role getRole() {
        return role;
    }
}