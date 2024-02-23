package com.authentication.userAuthentication.Repo;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.security.core.userdetails.UserDetails;

import com.authentication.userAuthentication.Entity.User;


public interface UserRepo extends JpaRepository<User, Long>{
    User findByUserName(String userName);
    User findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUserName(String userName);
}
