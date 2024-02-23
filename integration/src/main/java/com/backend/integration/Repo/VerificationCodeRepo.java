package com.backend.integration.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.integration.Entity.VerificationCodeEntity;

public interface VerificationCodeRepo extends JpaRepository<VerificationCodeEntity, Long> {
    Optional<VerificationCodeEntity> findByUserEmail(String userEmail);
}