package com.app.chati.Controller;


import com.app.chati.Model.Users;
import com.app.chati.Request.UpdateUserRequest;
import com.app.chati.Response.ApiResponse;
import com.app.chati.Response.LoginResponse;
import com.app.chati.Response.RegisterResponse;
import com.app.chati.Service.JwtService;
import com.app.chati.Service.UserMainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserMainService userMainService;
    @Autowired
    private JwtService jwtService;


    ///------------------------------------------------------------------------------------


    /// Authentication specific endpoints. Register and login

    //check whether entered name is unique or not. works in loop
    @PostMapping("/user/is_unique")
    public boolean is_unique(@RequestParam("username") String username){
        Users user = userMainService.findUserByUsername(username);

        if(user!=null){
            return false;
        }
        return true;
    }

    //register
    @PostMapping("/user/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody Users user){
        System.out.println("user registered");
        RegisterResponse registerResponse = userMainService.register(user);

        return new ResponseEntity<>(registerResponse,HttpStatus.OK);
    }

    //handled by authentication manager. login
    @PostMapping("/user/login")
    public ResponseEntity<LoginResponse> login(@RequestBody Users user){
        System.out.println("login user");
        LoginResponse loginResponse = userMainService.verify(user);
        return new ResponseEntity<>(loginResponse,HttpStatus.OK);
    }


    /// ---------------------------------------------------------------------------------------



    ///for these endpoints, JWT will invoke automatically.
    /// General endpoints, tested for basic test cases.

    @GetMapping("/profile")
    public ResponseEntity<Users> getUserProfileHandler(@RequestHeader("Authorization") String token){
        Users user = userMainService.findUserByJwt(token);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search/{query}")
    public ResponseEntity<List<Users>> searchUsersHandler(@PathVariable("query") String query){
        List<Users> user_list = userMainService.searchUsers(query);
        return new ResponseEntity<>(user_list,HttpStatus.OK);
    }

    @PostMapping("/update/{username}")
    public ResponseEntity<ApiResponse> updateUserHandler(@PathVariable("username") String username,
                                                         @RequestBody UpdateUserRequest req
    ){
        Users user = userMainService.updateUser(username,req);

        if(user!=null){
            return new ResponseEntity<>(new ApiResponse("User updated",true),HttpStatus.OK);
        }
        else{
            throw new RuntimeException("User not updated. May be not present");
        }
    }



}
