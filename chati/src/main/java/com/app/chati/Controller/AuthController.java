package com.app.chati.Controller;


import com.app.chati.Component.JwtUtils;
import com.app.chati.Entity.User;
import com.app.chati.Service.AuthService;
import com.app.chati.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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


    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/register")
    public Map<String,String> register(@RequestBody Map<String,String> request){
        String token = authService.registerUser(
                request.get("name"),
                request.get("email"),
                request.get("password")
        );

        if(token==null){
            return Map.of("token","");
        }

        System.out.println("token generated");

        return Map.of("token",token);
    }

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody Map<String,String> request){
        String email = request.get("email");
        String password = request.get("password");

        String token = authService.loginUser(email, password);

        if(token == null){
            System.out.println("login failed");
            return null;
        }

        System.out.println("token generated");

        return Map.of("token",token);
    }
    
}
