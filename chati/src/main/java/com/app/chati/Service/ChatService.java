package com.app.chati.Service;


import com.app.chati.Model.Chat;
import com.app.chati.Model.Users;
import com.app.chati.Repository.ChatRepository;
import com.app.chati.Request.GroupChatRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserMainService userMainService;

    public Chat createChat(String req_username, String username_2){

        Users user1 = userMainService.findUserByUsername(req_username);
        Users user2 = userMainService.findUserByUsername(username_2);
        Chat existing_chat = chatRepository.findSingleChatByUserId(user1.getId(),user2.getId());


        if(existing_chat!=null){
            return existing_chat;
        }


        Chat chat = new Chat();

        chat.setCreated_by(user1);
        chat.getAdmins().add(user1);
        chat.getUsers().add(user1);
        chat.getUsers().add(user2);
        chat.set_group(false);

        return chatRepository.save(chat);

    }

    public Chat findChatById(ObjectId id){
        Optional<Chat> chat = chatRepository.findById(id);

        if(chat.isPresent()){
            return chat.get();
        }
        else {
            throw new RuntimeException("Chat not found");
        }
    }


    public List<Chat> findAllChatsByUsername(String username){
        Users user = userMainService.findUserByUsername(username);
        if(user==null){
            throw new RuntimeException("User not found");
        }

        System.out.println(user.getUsername());
        List<Chat> user_chats = chatRepository.findChatByUserId(user.getId());
        System.out.println(user_chats);
        return user_chats;
    }

    public Chat createGroup(GroupChatRequest req, String req_username){
        Chat group = new Chat();
        Users req_user = userMainService.findUserByUsername(req_username);
        group.set_group(true);
        group.setChat_name(req.getChat_name());
        group.setChat_image(req.getChat_image());
        group.setCreated_by(req_user);
        group.getAdmins().add(req_user);
        group.getUsers().add(req_user);

        for(String username : req.getUsers()){
            Users user = userMainService.findUserByUsername(username);
            group.getUsers().add(user);
        }
        return group;
    }

    public Chat addUserToGroup(String username ,ObjectId chat_id,String user_2){
        Optional<Chat> chat = chatRepository.findById(chat_id);

        if(chat.isPresent()){
            Users user = userMainService.findUserByUsername(username);
            Chat req_chat = chat.get();

            if(req_chat.getAdmins().contains(user)){
                Users user2 = userMainService.findUserByUsername(user_2);
                req_chat.getUsers().add(user2);
                return chatRepository.save(req_chat);
            }
            else{
                throw new RuntimeException("User is not admin of group");
            }


        }
        else {
            throw new RuntimeException("Chat not found");
        }
    }

    public Chat renameGroup(ObjectId chat_id, String group_name,String req_username){
        Optional<Chat> chat = chatRepository.findById(chat_id);

        if(chat.isPresent()){
            Chat req_chat = chat.get();
            Users user = userMainService.findUserByUsername(req_username);

            if(req_chat.getUsers().contains(user)){
                req_chat.setChat_name(group_name);
            }
            else{
                throw new RuntimeException("User is not the member of group");
            }

            return chatRepository.save(req_chat);
        }
        else{
            throw new RuntimeException("Chat not found with the given id");
        }
    }

    public Chat removeFromGroup(String username,ObjectId chat_id,String user_2){
        Optional<Chat> chat = chatRepository.findById(chat_id);

        if(chat.isPresent()){
            Users user = userMainService.findUserByUsername(username);
            Users user2 = userMainService.findUserByUsername(user_2);

            if(user==null || user2==null){
                throw new RuntimeException("One of the user is not present");
            }

            Chat req_chat = chat.get();

            if(req_chat.getAdmins().contains(user)){

                req_chat.getUsers().remove(user2);
                return chatRepository.save(req_chat);
            }
            else if(req_chat.getUsers().contains(user)){
                if(user.getId().equals(user2.getId())){
                    req_chat.getUsers().remove(user2);
                    return chatRepository.save(req_chat);
                }else{
                    throw new RuntimeException("User can't remove another user");
                }

            }
            else{
                throw new RuntimeException("User is not admin of group");
            }


        }
        else {
            throw new RuntimeException("Chat not found");
        }
    }


    public void deleteChat(ObjectId chat_id, String username){
       Optional<Chat> chat =  chatRepository.findById(chat_id);

       if(chat.isPresent()){
           Chat req_chat = chat.get();
           chatRepository.deleteById(req_chat.getId());
       }
    }

}
