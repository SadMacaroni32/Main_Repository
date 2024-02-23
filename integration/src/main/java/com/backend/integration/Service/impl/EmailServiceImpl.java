package com.backend.integration.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.backend.integration.Entity.EmailDetails;
import com.backend.integration.Entity.ForgotCodeEntity;
import com.backend.integration.Entity.User;
import com.backend.integration.Entity.VerificationCodeEntity;
import com.backend.integration.Exceptions.UserNotFoundException;
import com.backend.integration.Repo.ForgotCodeRepo;
import com.backend.integration.Repo.UserRepo;
import com.backend.integration.Repo.VerificationCodeRepo;
import com.backend.integration.Service.AuthService;
import com.backend.integration.Service.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;

import java.io.File;
import java.time.Instant;
import java.time.LocalDateTime;
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
    private ForgotCodeRepo forgotCodeRepo;

    @Autowired
    private VerificationCodeRepo verificationCodeRepo;

    @Value("${spring.mail.username}")
    private String sender;

    private final Map<String, String> generatedCodeStorage = new HashMap<>();
    private final Map<String, String> enteredCodeStorage = new HashMap<>();
    private final Map<String, VerificationCodeEntity> verificationCodeMap = new ConcurrentHashMap<>();
    private final Map<String, String> passwordResetCodes = new HashMap<>();



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
    public void sendForgotCodeViaEmail(String userEmail, String forgotCode) {
        // Implement the logic to send the forgot code via email
        // You can use the injected JavaMailSender or any other email sending mechanism
        // Include the user's email address, subject, and the generated forgot code in the email
        // Example:
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(userEmail);
        emailDetails.setSubject("Forgot Code");
        emailDetails.setMsgBody("Your forgot code is: " + forgotCode);

        sendSimpleMail(emailDetails);
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

    @Override
    public String getStoredCode(String userEmail) {
        return generatedCodeStorage.getOrDefault(userEmail, "");
    }

    @Override
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

    private String generateForgotCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    @Override
    @Transactional
    public void updateForgotCode(User user, String newForgotCode, Long forgotExpirationTimeInMillis) {
        // Fetch the existing forgot code entity for the user
        Optional<ForgotCodeEntity> existingForgotCodeOptional = forgotCodeRepo.findByUser(user);
    
        if (existingForgotCodeOptional.isPresent()) {
            // Update the existing forgot code entity
            ForgotCodeEntity existingForgotCode = existingForgotCodeOptional.get();
            existingForgotCode.setForgotCode(newForgotCode);
            existingForgotCode.setForgotExpirationTimeInMillis(forgotExpirationTimeInMillis);
            forgotCodeRepo.save(existingForgotCode);
        } else {
            // Create a new forgot code entity and save it
            ForgotCodeEntity newForgotCodeEntity = new ForgotCodeEntity(user, newForgotCode,forgotExpirationTimeInMillis);
            forgotCodeRepo.save(newForgotCodeEntity);
        }
    }

    private long getDefaultForgotCodeExpirationTimeInMillis() {
        // Implement this method to provide a default expiration time for forgot codes
        // This could be based on some configuration or constant value
        return System.currentTimeMillis() + (24 * 60 * 60 * 1000); // Example: expiration time is 24 hours from now
    }

    
    @Override
    @Transactional
    public void initiateForgotPassword(String email) {
        // Check if the user with the provided email exists
        User user = userRepo.findByEmail(email);
        if (user == null) {
            // Handle the case where the user is not found
            throw new UserNotFoundException("User not found for email: " + email);
        }
    
        // Check if there's an existing forgot code
        Optional<ForgotCodeEntity> existingForgotCode = forgotCodeRepo.findByUser(user);

        String forgotCode;
        long forgotExpirationTimeInMillis; // Declare it here

        if (existingForgotCode.isPresent()) {
            // Use the existing forgot code from memory
            forgotCode = generateForgotCode();
            forgotExpirationTimeInMillis = existingForgotCode.get().getForgotExpirationTimeInMillis(); // Retrieve from existing entity
        } else {
            // Generate a new forgot code
            forgotCode = generateForgotCode();

            // Create the forgot code entity
            forgotExpirationTimeInMillis = getDefaultForgotCodeExpirationTimeInMillis(); // Use your default expiration time logic here

            ForgotCodeEntity forgotCodeEntity = new ForgotCodeEntity(user, forgotCode, forgotExpirationTimeInMillis);

            // Save the forgot code to the database
            forgotCodeRepo.save(forgotCodeEntity);
        }

    
        // Update the forgot code in memory and in the database
        Map<String, Object> forgotCodeInfo = new HashMap<>();
        forgotCodeInfo.put("code", forgotCode);
        forgotCodeInfo.put("expirationTime", forgotExpirationTimeInMillis);
    
        passwordResetCodes.put(user.getEmail(), forgotCode);
        updateForgotCode(user, forgotCode, forgotExpirationTimeInMillis);
    
        // Send the forgot code via email
        sendForgotCodeViaEmail(user.getEmail(), forgotCode);
    }
    
    @Override
    @Transactional
    public String generateAndStoreForgotCode(String userEmail) {
        return generateAndStoreForgotCode(userEmail, getDefaultExpirationTimeInMillis());
    }

    @Override
    @Transactional
    public String generateAndStoreForgotCode(String userEmail, Long expirationTimeInMillis) {
        User user = userRepo.findByEmail(userEmail);
    
        if (user != null) {
            // Generate a new forgot code
            String generatedCode = generateRandomCode();
    
            if (expirationTimeInMillis == null) {
                expirationTimeInMillis = getDefaultForgotCodeExpirationTimeInMillis();
            }
    
            // Create or update the forgot code entity
            updateForgotCode(user, generatedCode, expirationTimeInMillis);
    
            // Update the forgot code in memory
            passwordResetCodes.put(userEmail, generatedCode);
    
            return generatedCode;
        } else {
            return "User not found";
        }
    }
    
    @Override
    @Transactional
    public boolean isForgotCodeValid(String userEmail, String enteredCode) {
        // Retrieve the stored code from the map
        String storedCode = passwordResetCodes.get(userEmail);

        if (storedCode != null) {
            // Check if the entered code matches the stored code
            return enteredCode.equals(storedCode);
        }

        return false;
    }
    
   /*  @Override
    @Transactional
    public void resetPassword(String userEmail, String forgotCode, String newPassword) {
        // Find the user by email
        User user = userRepo.findByEmail(userEmail);
    
        if (user != null) {
            // Find the ForgotCodeEntity associated with the user ID and the provided forgot code
            Optional<ForgotCodeEntity> forgotCodeOptional = forgotCodeRepo.findByUserEmail(userEmail);
            if (forgotCodeOptional.isPresent()) {
                // Forgot code is valid, update the user's password
                user.setPassword(newPassword);
                userRepo.save(user);
    
                // Optionally, you may want to delete the used forgot code from the database
                forgotCodeRepo.delete(forgotCodeOptional.get());
            } else {
                // Handle the case where the forgot code is invalid
                throw new VerificationCodeException("Invalid forgot code");
            }
        } else {
            // Handle the case where the user is not found
            throw new UserNotFoundException("User not found for email: " + userEmail);
        }
    }*/
    
    @Override
    @Transactional
    public void updatePassword(String userEmail, String newPassword) {
        // Find the user by email
        User user = userRepo.findByEmail(userEmail);
    
        if (user != null) {
            // Update the user's password with the hashed password
            user.setPassword(newPassword);
            userRepo.save(user);
        } else {
            // Handle the case where the user is not found
            throw new UserNotFoundException("User not found for email: " + userEmail);
        }
    }

    @Override
    public void resetPassword(String userEmail, String verificationCode, String newPassword) {
        throw new UnsupportedOperationException("Unimplemented method 'resetPassword'");
    }
}
