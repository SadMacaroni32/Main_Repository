package com.authentication.userAuthentication.Controller;

import com.authentication.userAuthentication.Entity.EmailDetails;
import com.authentication.userAuthentication.Entity.User;
import com.authentication.userAuthentication.Entity.VerificationCodeEntity;
import com.authentication.userAuthentication.Service.AuthService;
import com.authentication.userAuthentication.Service.EmailService;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class EmailController {

    @Autowired
    private AuthService authService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendMail")
    public String sendMail(@RequestBody EmailDetails details) {
        return emailService.sendSimpleMail(details);
    }

    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(@RequestBody EmailDetails details) {
        return emailService.sendMailWithAttachment(details);
    }

    @PostMapping("/generateVerificationCode")
    public String generateVerificationCode(@RequestBody EmailDetails details) {
        long expirationTimeInMillis = System.currentTimeMillis() + (5 * 1000); // 5 minutes in milliseconds
        String generatedCode = emailService.generateAndStoreVerificationCode(details.getRecipient(), expirationTimeInMillis);
        details.setGeneratedCode(generatedCode);
        return generatedCode;
    }

    // New endpoint for resending verification code
    @PostMapping("/resendCode")
    public ResponseEntity<String> resendVerificationCode(@RequestBody EmailDetails details) {
        try {
            String userEmail = details.getRecipient();
            User user = authService.getUserByEmail(userEmail);
    
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
    
            // Generate and store a new verification code for the user
            String newVerificationCode = emailService.generateVerificationCode(); // Assuming this generates a new code
    
            VerificationCodeEntity existingVerificationCode = emailService.getStoredVerificationInfoForUser(userEmail);
    
            if (existingVerificationCode != null) {
                // Update the existing verification code
                existingVerificationCode.setVerificationCode(newVerificationCode);
                existingVerificationCode.setExpirationTimeInMillis(System.currentTimeMillis() + (5 * 60 * 1000)); // Set new expiration time
    
                // Save the updated verification code to the database
                emailService.saveVerificationCode(existingVerificationCode);
            } else {
                // If no existing verification code, generate and store a new one
                VerificationCodeEntity newVerificationCodeEntity = new VerificationCodeEntity();
                newVerificationCodeEntity.setUser(user);
                newVerificationCodeEntity.setVerificationCode(newVerificationCode);
                newVerificationCodeEntity.setExpirationTimeInMillis(System.currentTimeMillis() + (5 * 60 * 1000)); // Set expiration time to 5 minutes
                emailService.saveVerificationCode(newVerificationCodeEntity);
            }
    
            // Send email with the new verification code
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(userEmail);
            emailDetails.setGeneratedCode(newVerificationCode);
            emailDetails.setSubject("New Verification Code");
            emailDetails.setContent("Your new verification code is: " + newVerificationCode);
            emailService.sendSimpleMail(emailDetails);
    
            return ResponseEntity.ok("Verification code resent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to resend verification code");
        }
    }
    
    
    @PostMapping("/verifyCode")
    public ResponseEntity<String> verifyCode(@RequestBody EmailDetails details) {
        System.out.println("Received Verification Request: " + details.toString());

        String userEmail = details.getRecipient();
        String enteredCode = details.getVerificationCode();
        boolean verificationResult = emailService.verifyCode(userEmail, enteredCode);

        if (verificationResult) {
            return ResponseEntity.ok("Verification successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Verification failed");
        }
    }
    // Add this method to AuthController
    @GetMapping("/checkCodeExpiration")
    public ResponseEntity<Map<String, Object>> checkCodeExpiration(@RequestParam String email) {
        try {
            VerificationCodeEntity verificationCodeEntity = emailService.getStoredVerificationInfoForUser(email);
            boolean codeExpired = emailService.isVerificationCodeExpired(email);
    
            Map<String, Object> response = new HashMap<>();
            response.put("codeExpired", codeExpired);
            response.put("expirationTime", verificationCodeEntity.getExpirationTimeInMillis()); // Assuming getExpirationTimeInMillis() method exists
    
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Internal Server Error"));
        }
    }
    

}