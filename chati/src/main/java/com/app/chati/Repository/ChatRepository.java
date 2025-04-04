package com.app.chati.Repository;

import com.app.chati.Model.Chat;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ChatRepository extends MongoRepository<Chat,ObjectId> {

    @Query("{ 'users': ?0 }")
    List<Chat> findChatByUserId(ObjectId userId);

    @Query("{ 'is_group': false, 'users': { $all: [?0, ?1] } }")
    Chat findSingleChatByUserId(ObjectId userId1, ObjectId userId2);
}
