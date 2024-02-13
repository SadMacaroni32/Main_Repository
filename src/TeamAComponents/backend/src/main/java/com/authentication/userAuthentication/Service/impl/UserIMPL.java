// package com.authentication.userAuthentication.Service.impl;

// import java.security.SecureRandom;
// import java.util.ArrayList;
// import java.util.Base64;
// import java.util.List;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.authentication.userAuthentication.Dto.UserDto;
// import com.authentication.userAuthentication.Dto.Request.LoginDto;
// import com.authentication.userAuthentication.Dto.Request.RegisterDto;
// import com.authentication.userAuthentication.Dto.Response.LoginMessage;
// import com.authentication.userAuthentication.Entity.User;
// import com.authentication.userAuthentication.Entity.Enums.Role;
// import com.authentication.userAuthentication.Repo.UserRepo;
// import com.authentication.userAuthentication.Service.UserService;


// @Service
// public class UserIMPL implements UserService{

//     @Autowired
//     private UserRepo userRepo;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

// // METHOD FOR ADDING USER

//     @Override
//     public String registerUser(RegisterDto registerDto) {
//         // Additional validation logic if needed

//         // Hash the password before saving it
//         String hashedPassword = passwordEncoder.encode(registerDto.getPassword());

//         // Generate a verification token (you can use your own logic for this)
//         String verificationToken = generateVerificationToken();

//         // Default role = student
//         Role defaultRole = Role.STUDENT;

//         // Create a new User instance with the provided fields
//         User user = new User();
//         user.setFirstName(registerDto.getFirstName());
//         user.setLastName(registerDto.getLastName());
//         user.setUserName(registerDto.getUserName());
//         user.setEmail(registerDto.getEmail());
//         user.setPassword(hashedPassword); // Set the hashed password
//         user.setRole(defaultRole.name()); // Set the default role

//         // Save the user
//         userRepo.save(user);

//         // Return the username
//         return user.getUserName();
//     }

// // METHOD FOR FINDING USER BY ID

//     @Override
//     public UserDto findUserById(Long userId) {
//         Optional<User> userOptional = userRepo.findById(userId);

//         if (userOptional.isPresent()) {
//             User user = userOptional.get();
//             // Convert User entity to UserDto and return
//             return new UserDto(
//                     user.getUserId(),
//                     user.getFirstName(),
//                     user.getLastName(),
//                     user.getUserName(),
//                     user.getEmail(),
//                     null, // Exclude password in UserDto
//                     user.getRole()
//             );
//         }
//         // Return null or handle the case where the user is not found
//         return null;
//     }

// //METHOD FOR GETTING THE LIST OF USERS
    
//     @Override
//     public List<UserDto> getAllUsers() {
//         List<User> userList = userRepo.findAll();
//         List<UserDto> userDtoList = new ArrayList<>();

//         for (User user : userList) {
//             userDtoList.add(new UserDto(
//                     user.getUserId(),
//                     user.getFirstName(),
//                     user.getLastName(),
//                     user.getUserName(),
//                     user.getEmail(),
//                     null, // Exclude password in UserDto
//                     user.getRole()
//             ));
//         }

//         return userDtoList;
//     }

//     private String generateVerificationToken() {
//         SecureRandom secureRandom = new SecureRandom();
//         byte[] tokenBytes = new byte[32];
//         secureRandom.nextBytes(tokenBytes);

//         // Encode the random bytes to a Base64 string
//         return Base64.getEncoder().encodeToString(tokenBytes);
//     }

// //METHOD FOR LOGGING IN A USER

//     @Override
//     public LoginMessage loginUser(LoginDto loginDto) {
//         Optional<User> user = userRepo.findByEmail(loginDto.getEmail());

//         if (user.isPresent()) {
//             String storedPassword = user.get().getPassword();
//             String enteredPassword = loginDto.getPassword();

//             // Log the stored and entered passwords for debugging
//             System.out.println("Stored Password: " + storedPassword);
//             System.out.println("Entered Password: " + enteredPassword);

//             if (passwordEncoder.matches(enteredPassword, storedPassword)) {
//                 return new LoginMessage("Login Success", true);
//             } else {
//                 return new LoginMessage("Login Failed: Incorrect password", false);
//             }
//         } else {
//             return new LoginMessage("Email does not exist", false);
//         }
//     }


// //METHOD FOR FINDING A USER BY EMAIL 
    
//     @Override
//     public UserDto findUserByEmail(String email) {
//         Optional<User> userOptional = userRepo.findByEmail(email);
    
//         if (userOptional.isPresent()) {
//             User user = userOptional.get();
//             // Convert User entity to UserDto and return
//             return new UserDto(
//                     user.getUserId(),
//                     user.getFirstName(),
//                     user.getLastName(),
//                     user.getUserName(),
//                     user.getEmail(),
//                     null, // Exclude password in UserDto
//                     user.getRole()
//             );
//         }
//         // Return null or handle the case where the user is not found
//         return null;
//     }

// //METHOD FOR UPDATING A USER

//     @Override
//     public void updateUser(UserDto updatedUserDto) {
//         Optional<User> userOptional = userRepo.findByEmail(updatedUserDto.getEmail());

//         if (userOptional.isPresent()) {
//             User existingUser = userOptional.get();
//             existingUser.setFirstName(updatedUserDto.getFirstName());
//             existingUser.setLastName(updatedUserDto.getLastName());
//             existingUser.setUserName(updatedUserDto.getUserName());

//             // Don't update the password during user update

//             userRepo.save(existingUser);

//             // Add logging statements
//             System.out.println("User updated: " + existingUser);
//         } else {
//             // Handle user not found
//             System.out.println("User not found for email: " + updatedUserDto.getEmail());
//         }
//     }

// }
