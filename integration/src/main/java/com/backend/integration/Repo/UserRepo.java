package com.backend.integration.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.integration.Entity.User;

public interface UserRepo extends JpaRepository<User, Long>{
    User findByUserName(String userName);
    User findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUserName(String userName);
    boolean existsByPhoneNumber(String phoneNumber);
}
