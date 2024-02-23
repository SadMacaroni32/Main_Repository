package com.backend.integration.Dto.Request;

public record SignInDto(
    String email,
    String password) {
}