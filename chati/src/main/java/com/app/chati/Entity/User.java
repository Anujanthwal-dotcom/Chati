package com.app.chati.Entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {
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

}
