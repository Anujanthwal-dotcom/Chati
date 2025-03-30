package com.app.chati.Entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    private String id;

    private String name;

    private String email;

    private String password;

    public User(String name,String email,String password){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // Return roles/authorities if you add them later
    }

    @Override
    public String getUsername() {
        return this.email; // Username for authentication (email in your case)
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Modify according to your needs
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Modify according to your needs
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Modify according to your needs
    }

    @Override
    public boolean isEnabled() {
        return true; // Modify according to your needs
    }
}

