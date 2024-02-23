package com.authentication.userAuthentication.Dto.Request;

public record JwtDto(
    String accessToken,
    String userId,
    String username,
    String firstName,
    String lastName,
    String email
) {
    // Constructor with parameters
    public JwtDto {
        // Any additional initialization logic here
    }
    public JwtDto(String accessToken) {
        this(accessToken, null, null, null, null, null);
    }
    // Example of a with method to create a new instance with additional fields
    public JwtDto withUserInformation(String userId, String username, String firstName, String lastName, String email) {
        return new JwtDto(this.accessToken(), userId, username, firstName, lastName, email);
    }
}