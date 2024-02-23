// package com.authentication.userAuthentication.Service;

// import java.util.Collection;
// import java.util.stream.Collectors;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.authentication.userAuthentication.Entity.Enums.Role;
// import com.authentication.userAuthentication.Entity.User;
// import com.authentication.userAuthentication.Repo.UserRepo;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {

//     private UserRepo userRepo;

//     public CustomUserDetailsService(UserRepo userRepo) {
//         this.userRepo = userRepo;
//     }

//     @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         User user = userRepo.findByEmail(email);

//         if (user != null) {
//             return new org.springframework.security.core.userdetails.User(user.getEmail(),
//                     user.getPassword(),
//                     mapRolesToAuthorities(user.getRole()));
//         } else {
//             throw new UsernameNotFoundException("Invalid username or password.");
//         }
//     }

//     private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
//         return roles.stream()
//                 .flatMap(role -> role.getAuthorities().stream())
//                 .collect(Collectors.toList());
//     }
// }

// // import org.springframework.security.core.userdetails.UserDetails;
// // import org.springframework.security.core.userdetails.UserDetailsService;
// // import org.springframework.security.core.userdetails.UsernameNotFoundException;
// // import org.springframework.stereotype.Service;

// // import com.authentication.userAuthentication.Dto.UserDto;

// // @Service
// // public class CustomUserDetailsService implements UserDetailsService {

// //     private final UserService userService;  // Assuming you have a UserService

// //     public CustomUserDetailsService(UserService userService) {
// //         this.userService = userService;
// //     }

// //     @Override
// //     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
// //         // Load user details by username (in this case, by email)
// //         UserDto userDto = userService.findUserByEmail(username);

// //         if (userDto == null) {
// //             throw new UsernameNotFoundException("User not found with username: " + username);
// //         }

// //         // Create a UserDetails object based on your UserDto
// //         return org.springframework.security.core.userdetails.User.builder()
// //                 .username(userDto.getEmail())
// //                 .password(userDto.getPassword()) // Make sure the password is hashed
// //                 .roles(userDto.getRole())
// //                 .build();
// //     }
// // }
