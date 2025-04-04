package com.app.chati.Service;


import com.app.chati.Model.Users;
import com.app.chati.Repository.UserRepository;
import com.app.chati.Request.UpdateUserRequest;
import com.app.chati.Response.LoginResponse;
import com.app.chati.Response.RegisterResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserMainService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    /// -----------------------------------------------------------------------------------------------

    public RegisterResponse register(Users user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));



        if(userRepository.save(user)!=null){
            RegisterResponse registerResponse = new RegisterResponse();
            registerResponse.setMessage("User registered");
            registerResponse.setStatus(true);
            registerResponse.setToken(jwtService.generateToken(user.getUsername()));
            return registerResponse;
        }
        else{
            return new RegisterResponse("User not registered",false,null);
        }
    }

    public LoginResponse verify(Users user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));

        if(authentication.isAuthenticated()){
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setMessage("User logged in");
            loginResponse.setStatus(true);
            loginResponse.setToken(jwtService.generateToken(user.getUsername()));
            return loginResponse;
        }
        else{
            return new LoginResponse("User not Logged in",false,null);
        }
    }

    /// ------------------------------------------------------------------------------------------------

    public Users findUserById(ObjectId id){
        Optional<Users> user = userRepository.findById(id);

        if(user.isPresent()){
            return user.get();
        }
        else{
            throw new RuntimeException("User not found");
        }
    }

    public Users findUserByUsername(String username){
        Users user = userRepository.findByUsername(username);
        if(user!=null){
            return user;
        }
        else{
            throw new RuntimeException("User not found with given username");
        }
    }

    public Users findUserByJwt(String jwt){

        if(!jwt.startsWith("Bearer ")){
            throw new RuntimeException("Not a valid token");
        }

        String token_jwt = jwt.substring(7);

        String username = jwtService.extractUsername(token_jwt);

        if(username!=null){
            Users user = userRepository.findByUsername(username);
            if(user!=null){
                return user;
            }
            else{
                throw new RuntimeException("User not found with username. May be deleted from database");
            }
        }
        else{
            throw new RuntimeException("Token not valid");
        }
    }

    public Users updateUser(String username, UpdateUserRequest req){
        Users user = findUserByUsername(username);

        if(req.getUsername()!=null){
            user.setUsername(req.getUsername());
        }

        if(req.getProfile_picture()!=null){
            user.setProfile_picture(req.getProfile_picture());
        }

        return userRepository.save(user);
    }

    public List<Users> searchUsers(String query){
        List<Users> user_list = userRepository.searchUsers(query);

        return user_list;
    }

}
