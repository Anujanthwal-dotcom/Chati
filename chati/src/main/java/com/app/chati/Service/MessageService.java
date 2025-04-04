package com.app.chati.Service;

import com.app.chati.Model.Chat;
import com.app.chati.Model.Message;
import com.app.chati.Model.Users;
import com.app.chati.Repository.MessageRepository;
import com.app.chati.Request.SendMessageRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatService chatService;
    @Autowired
    private UserMainService userMainService;


    public Message sendMessage(SendMessageRequest req){
        Users user = userMainService.findUserByUsername(req.getUsername());
        Chat chat = chatService.findChatById(req.getChat_id());

        Message message = new Message();
        message.setSender(user);
        message.setChat(chat);
        message.setContent(req.getContent());
        message.setTimestamp(LocalDateTime.now());

        return message;
    }

    public List<Message> getChatMessages(ObjectId chat_id, String req_user){
        Chat chat = chatService.findChatById(chat_id);
        Users user = userMainService.findUserByUsername(req_user);
        if(chat.getUsers().contains(user)){
            List<Message> messages = messageRepository.findByChatId(chat.getId());
            return messages;
        }
        else{
            throw new RuntimeException("you are not in the group");
        }
    }

    public Message findMessagesById(ObjectId message_id){
        Optional<Message> opt = messageRepository.findById(message_id);

        if(opt.isPresent()){
            return opt.get();
        }
        else{
            throw new RuntimeException("Message not found with given Id");
        }
    }


    public void deleteMessage(ObjectId message_id,String username){
        Message message = findMessagesById(message_id);

        if(message.getSender().getUsername().equals(username)){
            messageRepository.deleteById(message_id);
        }
        else {
            throw new RuntimeException("You can't delete this message:" + username);
        }
    }
}
