package com.backend.integration.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.integration.Entity.ForgotCodeEntity;
import com.backend.integration.Entity.User;

public interface ForgotCodeRepo extends JpaRepository<ForgotCodeEntity, Long> {
    ForgotCodeEntity findByForgotCode(String forgotCode);
    Optional<ForgotCodeEntity> findByUser(User user);
    Optional<ForgotCodeEntity> findByUserEmail(String userEmail);
}