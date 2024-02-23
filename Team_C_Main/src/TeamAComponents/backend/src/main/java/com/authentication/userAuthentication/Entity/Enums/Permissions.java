package com.authentication.userAuthentication.Entity.Enums;

public enum Permissions {
    STUDENT_READ("student:read"),
    STUDENT_UPDATE("student:update"),
    STUDENT_DELETE("student:delete"),
    INSTRUCTOR_READ("INSTRUCTOR:read"),
    INSTRUCTOR_UPDATE("INSTRUCTOR:update"),
    INSTRUCTOR_DELETE("INSTRUCTOR:delete"),
    INSTRUCTOR_CREATE("INSTRUCTOR:create");

    private final String permission;

    private Permissions(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }    
}
