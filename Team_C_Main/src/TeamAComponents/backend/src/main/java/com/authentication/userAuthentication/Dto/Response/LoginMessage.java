package com.authentication.userAuthentication.Dto.Response;

public class LoginMessage {
    private String message;
    private Boolean success;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean isSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public LoginMessage(String message, Boolean success) {
        this.message = message;
        this.success = success;
    }
}
