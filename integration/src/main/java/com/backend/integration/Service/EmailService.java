package com.backend.integration.Service;

import java.time.LocalDateTime;

import com.backend.integration.Entity.EmailDetails;
import com.backend.integration.Entity.User;
import com.backend.integration.Entity.VerificationCodeEntity;

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

    String generateAndStoreForgotCode(String userEmail);

    void sendForgotCodeViaEmail(String userEmail, String forgotCode);

    String generateAndStoreForgotCode(String userEmail, Long expirationTimeInMillis);
    
    boolean isForgotCodeValid(String userEmail, String enteredCode);

    // Add these two methods with correct signatures
    void resetPassword(String userEmail, String verificationCode, String newPassword);

    String getStoredCode(String userEmail);

    void initiateForgotPassword(String email);

    void updatePassword(String userEmail, String newPassword);

    void updateForgotCode(User user, String newForgotCode, Long forgotExpirationTimeInMillis);


}