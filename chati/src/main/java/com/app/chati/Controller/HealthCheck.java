package com.app.chati.Controller;


import com.app.chati.Model.Users;
import com.app.chati.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class HealthCheck {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/health")
    public String healthCheck(){
        return "Healthy";
    }

    @GetMapping("/users")
    public List<Users> getUsers(){
        return userRepository.findAll();
    }

}
