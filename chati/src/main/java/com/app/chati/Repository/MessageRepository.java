package com.app.chati.Repository;

import com.app.chati.Model.Message;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message,ObjectId> {

    @Query("{ 'chat': ?0 }")
    List<Message> findByChatId(ObjectId chatId);
}
