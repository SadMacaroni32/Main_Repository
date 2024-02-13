package com.authentication.userAuthentication.Service.impl;

import com.authentication.userAuthentication.Entity.EmailDetails;
import com.authentication.userAuthentication.Entity.User;
import com.authentication.userAuthentication.Entity.VerificationCodeEntity;
import com.authentication.userAuthentication.Repo.UserRepo;
import com.authentication.userAuthentication.Repo.VerificationCodeRepo;
import com.authentication.userAuthentication.Service.AuthService;
import com.authentication.userAuthentication.Service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;

import java.io.File;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;


@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private VerificationCodeRepo verificationCodeRepo; // Inject your VerificationCodeRepo

    @Value("${spring.mail.username}")
    private String sender;

    private final Map<String, String> generatedCodeStorage = new HashMap<>();
    private final Map<String, String> enteredCodeStorage = new HashMap<>();
    private final Map<String, VerificationCodeEntity> verificationCodeMap = new ConcurrentHashMap<>();

    @Override
    public String sendSimpleMail(EmailDetails details) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully";
        } catch (Exception e) {
            // Log the specific exception details
            return "Error while Sending Mail: " + e.getMessage();
        }
    }

    @Override
    public String sendMailWithAttachment(EmailDetails details) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(details.getSubject());

            FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));
            mimeMessageHelper.addAttachment(file.getFilename(), file);

            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        } catch (MessagingException e) {
            // Log the specific exception details
            return "Error while sending mail: " + e.getMessage();
        }
    }

    @Override
    @Transactional
    public String generateAndStoreVerificationCode(String userEmail) {
        return generateAndStoreVerificationCode(userEmail, getDefaultExpirationTimeInMillis());
    }
    @Override
    @Transactional
    public String generateAndStoreVerificationCode(String userEmail, Long expirationTimeInMillis) {
        // Fetch the user from the repository based on userEmail
        User user = userRepo.findByEmail(userEmail);

        if (user != null) {
            String generatedCode = generateRandomCode();

            // Use a default expiration time if not provided
            if (expirationTimeInMillis == null) {
                expirationTimeInMillis = getDefaultExpirationTimeInMillis();
            }

            // Save verification code with expiration time to the database
            verificationCodeRepo.save(new VerificationCodeEntity(user, generatedCode, expirationTimeInMillis));

            // Store verification code in memory (if needed)
            generatedCodeStorage.put(userEmail, generatedCode);

            return generatedCode;
        } else {
            // Handle the case where the user is not found
            return "User not found";
        }
    }

    private long getDefaultExpirationTimeInMillis() {
        // Implement this method to provide a default expiration time
        // This could be based on some configuration or constant value
        return System.currentTimeMillis() + (5 * 60 * 1000); // Example: expiration time is 5 minutes from now
    }

    @Override
    public VerificationCodeEntity getStoredVerificationInfoForUser(String userEmail) {
        // Find the stored verification information for the given user email
        Optional<VerificationCodeEntity> verificationInfoOptional = verificationCodeRepo.findByUserEmail(userEmail);

        return verificationInfoOptional.orElse(null);
    }

    @Override
    @Transactional
    public boolean verifyCode(String userEmail, String enteredCode) {
        // Get the stored verification info for the user
        Optional<VerificationCodeEntity> verificationInfoOptional = verificationCodeRepo.findByUserEmail(userEmail);

        if (verificationInfoOptional.isPresent()) {
            VerificationCodeEntity verificationInfo = verificationInfoOptional.get();

            String storedCode = verificationInfo.getVerificationCode();
            long expirationTimeInMillis = verificationInfo.getExpirationTimeInMillis();

            // Log values for debugging
            System.out.println("Current Time: " + System.currentTimeMillis());
            System.out.println("Expiration Time: " + expirationTimeInMillis);
            System.out.println("Stored Code: " + storedCode);
            System.out.println("Entered Code: " + enteredCode);

            // Check if the code is expired
            if (System.currentTimeMillis() <= expirationTimeInMillis && enteredCode.equals(storedCode)) {
                // Code is valid, update the user's verification status
                authService.updateUserVerificationStatus(userEmail, true);
                return true;
            }
        }

        return false;
    }
    
    @Override
    public boolean isVerificationCodeExpired(String email) {
        VerificationCodeEntity verificationCodeEntity = verificationCodeMap.get(email);
        if (verificationCodeEntity != null) {
            Instant expirationTime = verificationCodeEntity.getExpirationTime();
            return Instant.now().isAfter(expirationTime);
        }
        return true; // Assume expired if no verification code is found
    }

    @Override
    public String getStoredCodeForUser(String userEmail) {
        return generatedCodeStorage.getOrDefault(userEmail, "");
    }

    @Override
    public String getEnteredCodeForUser(String verificationCode) {
        return enteredCodeStorage.getOrDefault(verificationCode, "");
    }
    @Override
    @Transactional
    public String resendVerificationCode(String userEmail) {
        User user = userRepo.findByEmail(userEmail);

        if (user != null) {
            // Check if there's an existing verification code
            Optional<VerificationCodeEntity> existingVerificationCode = verificationCodeRepo.findByUserEmail(userEmail);

            if (existingVerificationCode.isPresent()) {
                // Use the existing verification code and update its expiration time
                VerificationCodeEntity verificationCodeEntity = existingVerificationCode.get();
                verificationCodeEntity.setExpirationTimeInMillis(getDefaultExpirationTimeInMillis());
                verificationCodeRepo.save(verificationCodeEntity);

                // You can send the code by email or any other communication method
                return verificationCodeEntity.getVerificationCode();
            } else {
                // Generate a new verification code and store it
                String generatedCode = generateRandomCode();
                long expirationTimeInMillis = getDefaultExpirationTimeInMillis();

                verificationCodeRepo.save(new VerificationCodeEntity(user, generatedCode, expirationTimeInMillis));
                generatedCodeStorage.put(userEmail, generatedCode);

                // You can send the code by email or any other communication method
                return generatedCode;
            }
        } else {
            return "User not found";
        }
    }

    @Override
    @Transactional
    public String generateVerificationCode() {
        // Implement the logic to generate a verification code
        return generateRandomCode();
    }

    @Override
    public void storeEnteredCode(String verificationCode, String enteredCode) {
        enteredCodeStorage.put(verificationCode, enteredCode);
    }

    private String getStoredCode(String userEmail) {
        return generatedCodeStorage.getOrDefault(userEmail, "");
    }

    public void saveVerificationCode(VerificationCodeEntity verificationCodeEntity) {
        verificationCodeRepo.save(verificationCodeEntity);
    }

    private String generateRandomCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    @Override
    public LocalDateTime getExpirationTime() {
        // Implement this method if you need to retrieve the expiration time
        // This could be based on some configuration or constant value
        return LocalDateTime.now().plusMinutes(5); // Example: expiration time is 5 minutes from now
    }

    @Override
    public void setExpirationTime(LocalDateTime expirationTime) {
        // Implement this method if you need to set the expiration time
        // This could be useful if you want to customize the expiration time dynamically
        // For example, you might want to set the expiration time based on certain conditions
        // For now, you can leave it empty if not needed
    }
}
