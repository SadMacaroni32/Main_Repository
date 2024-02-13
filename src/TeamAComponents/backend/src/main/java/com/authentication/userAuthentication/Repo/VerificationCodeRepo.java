package com.authentication.userAuthentication.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.authentication.userAuthentication.Entity.VerificationCodeEntity;

public interface VerificationCodeRepo extends JpaRepository<VerificationCodeEntity, Long> {
    Optional<VerificationCodeEntity> findByUserEmail(String userEmail);
}