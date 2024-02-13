package com.authentication.userAuthentication.Entity;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class VerificationCodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String verificationCode;

    private long expirationTimeInMillis;
    private Instant expirationTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public VerificationCodeEntity() {
        // Default constructor
    }

    // Updated constructor to include user, verification code, and expiration time
    public VerificationCodeEntity(User user, String verificationCode, long expirationTimeInMillis) {
        this.user = user;
        this.verificationCode = verificationCode;
        this.expirationTimeInMillis = expirationTimeInMillis;
        this.expirationTime = Instant.ofEpochMilli(expirationTimeInMillis);
    }


    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public long getExpirationTimeInMillis() {
        return expirationTimeInMillis;
    }

    public void setExpirationTimeInMillis(long expirationTimeInMillis) {
        this.expirationTimeInMillis = expirationTimeInMillis;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Instant getExpirationTime() {
        return expirationTime;
    }
}
