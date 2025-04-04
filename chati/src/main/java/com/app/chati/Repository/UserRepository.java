package com.app.chati.Repository;

import com.app.chati.Model.Users;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<Users, ObjectId> {


    Users findByUsername(String username);

    //just testing. May need to change later
    @Query("{'username': {$regex: :query, $options: 'i'}}")
    List<Users> searchUsers(String query);
}
