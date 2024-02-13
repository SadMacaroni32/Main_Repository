package com.authentication.userAuthentication.Dto.Request;

public record SignInDto(
    String email,
    String password) {
}