package com.authentication.userAuthentication.Service;

import com.authentication.userAuthentication.Entity.EmailDetails;
import com.authentication.userAuthentication.Entity.VerificationCodeEntity;

import java.time.LocalDateTime;

public interface EmailService {

    LocalDateTime getExpirationTime();

    void setExpirationTime(LocalDateTime expirationTime);

    String sendSimpleMail(EmailDetails details);

    String sendMailWithAttachment(EmailDetails details);

    // Existing method for getting stored verification code
    String getStoredCodeForUser(String userEmail);

    void saveVerificationCode(VerificationCodeEntity verificationCodeEntity);

    // New method for generating and storing verification codes with expiration time
    String generateAndStoreVerificationCode(String userEmail);

    String generateAndStoreVerificationCode(String userEmail, Long expirationTimeInMillis);
    // New method for getting entered code
    String getEnteredCodeForUser(String verificationCode);

    // New method for storing entered code
    void storeEnteredCode(String verificationCode, String enteredCode);

    // Existing method for verifying the entered code
    boolean verifyCode(String userEmail, String enteredCode);

    VerificationCodeEntity getStoredVerificationInfoForUser(String userEmail);

    boolean isVerificationCodeExpired(String email);

    String generateVerificationCode();    

    String resendVerificationCode(String userEmail);
}
