package com.app.chati.Controller;


import com.app.chati.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Map<String,String> register(@RequestBody Map<String,String> request){
        String token = authService.registerUser(
                request.get("name"),
                request.get("email"),
                request.get("password")
        );

        return Map.of("token",token);
    }

    @PostMapping
    public Map<String,String> login(@RequestBody Map<String,String> request){
        String token = authService.loginUser(request.get("email"),request.get("password"));
        return Map.of("token",token);
    }
    
}
