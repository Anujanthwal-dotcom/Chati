package com.app.chati.Service;

import com.app.chati.Entity.User;
import com.app.chati.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Here we convert your custom User to Spring Security's User object
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),       // username
                user.getPassword(),    // password (it should be hashed)
                new ArrayList<>()      // authorities (leaving empty for now)
        );
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }


}
