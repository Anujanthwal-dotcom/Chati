package com.app.chati.Service;


import com.app.chati.Component.JwtUtils;
import com.app.chati.Entity.User;
import com.app.chati.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    private Argon2PasswordEncoder argon2PasswordEncoder = new Argon2PasswordEncoder(16,32,1,65536,5);


    public String registerUser(String name,String email,String password){
        Optional<User> existingUser = Optional.ofNullable(userRepository.findByEmail(email));

        if(existingUser.isPresent()){
            throw new RuntimeException("User already exists with this email");
        }

        String hashedPassword = argon2PasswordEncoder.encode(password);

        User user = new User(name,email,hashedPassword);

        userRepository.save(user);

        return jwtUtils.generateToken(email);
    }


    public String loginUser(String email,String password){
        User user = userRepository.findByEmail(email);

        if(user == null || !argon2PasswordEncoder.matches(password,user.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtils.generateToken(email);
    }

}
