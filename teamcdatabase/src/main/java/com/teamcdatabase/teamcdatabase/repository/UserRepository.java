package com.teamcdatabase.teamcdatabase.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamcdatabase.teamcdatabase.model.User;

public interface UserRepository extends JpaRepository <User , Long>{
}

