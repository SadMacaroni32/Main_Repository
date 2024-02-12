package com.teamcdatabase.teamcdatabase.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamcdatabase.teamcdatabase.exception.UserNotFoundException;
import com.teamcdatabase.teamcdatabase.model.User;
import com.teamcdatabase.teamcdatabase.repository.UserRepository;


@RestController
@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/user")
    User newUser(@NonNull @RequestBody User newUser) {
    return userRepository.save(newUser);
}
    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }
    
    //SHOW BY ID
    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
    }

    //EDIT DATA
    @PutMapping("/user/{id}")
    User updatUser(@RequestBody User newUser, @PathVariable Long id){
        return userRepository.findById(id)
        .map(user -> {
            user.setUsername(newUser.getUsername());
            user.setName(newUser.getName());
            user.setEmail(newUser.getEmail());
            return userRepository.save(user);
        }).orElseThrow(() -> new UserNotFoundException(id));
    }

    //DELETE DATA
    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with ID "+id+" has been deleted successfully.";
    }


    
} 
