package com.authentication.userAuthentication.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.authentication.userAuthentication.Entity.User;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class TokenProvider {

    @Value("${security.jwt.token.secret-key}")
    private String JWT_SECRET;

    // Set to store invalidated tokens (not suitable for a production environment)
    private final Set<String> invalidatedTokens = new HashSet<>();

    // In a production environment, consider using a database for storing invalidated tokens

    public String generateAccessToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            String token = JWT.create()
                    .withSubject(user.getEmail()) // Change here to use email as subject
                    .withClaim("email", user.getEmail()) // Additional claim for email
                    .withExpiresAt(genAccessExpirationDate())
                    .sign(algorithm);

            // In a production environment, store the generated token in the database

            return token;
        } catch (JWTCreationException exception) {
            throw new JWTCreationException("Error while generating token", exception);
        }
    }

    public String validateToken(String token) {
        // In a production environment, check if the token is invalidated by querying the database
        if (invalidatedTokens.contains(token)) {
            throw new JWTVerificationException("Token is invalidated");
        }

        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            return JWT.require(algorithm)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Error while validating token", exception);
        }
    }

    public void invalidateToken(String token) {
        // In a production environment, add the token to the database for invalidation
        invalidatedTokens.add(token);
    }

    public String extractTokenFromRequest(HttpServletRequest request) {
        // Get the token from the Authorization header
        String bearerToken = request.getHeader("Authorization");

        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Remove "Bearer " prefix
        }

        return null; // Token not found or not in the expected format
    }

    private Instant genAccessExpirationDate() {
        return LocalDateTime.now().plusDays(7).toInstant(ZoneOffset.of("-03:00")); // Expire tokens after 7 days
    }
}
