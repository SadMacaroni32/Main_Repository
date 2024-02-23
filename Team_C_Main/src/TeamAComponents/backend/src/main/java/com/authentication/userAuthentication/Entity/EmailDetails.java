package com.authentication.userAuthentication.Entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetails {
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
    private String verificationCode;
    private String generatedCode;
    private LocalDateTime expirationTime; 

    public String getContent() {
        return msgBody;
    }

    public void setContent(String content) {
        this.msgBody = content;
    }
    public void setExpirationTime(LocalDateTime expirationTime) {
        this.expirationTime = expirationTime;
    }
    public LocalDateTime getExpirationTime() {
        return expirationTime;
    }
}
