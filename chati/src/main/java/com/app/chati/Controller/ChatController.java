package com.app.chati.Controller;


import com.app.chati.Model.Chat;
import com.app.chati.Model.Users;
import com.app.chati.Request.GroupChatRequest;
import com.app.chati.Request.SingleChatRequest;
import com.app.chati.Response.ApiResponse;
import com.app.chati.Service.ChatService;
import com.app.chati.Service.UserMainService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ChatController {

    @Autowired
    private UserMainService userMainService;
    @Autowired
    private ChatService chatService;



    @PostMapping("/chat/single_chat/create")
    public ResponseEntity<Chat> createChatHandler(@RequestBody SingleChatRequest singleChatRequest
    , @RequestHeader("Authorization") String token){
        Users user = userMainService.findUserByJwt(token);

        Chat chat = chatService.createChat(user.getUsername(),singleChatRequest.getUsername());

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }




    @PostMapping("/chat/group_chat/create")
    public ResponseEntity<Chat> createGroupChatHandler(@RequestBody GroupChatRequest groupChatRequest
            , @RequestHeader("Authorization") String token){
        Users user = userMainService.findUserByJwt(token);

        if(user==null){
            throw new RuntimeException("user not found");
        }

        Chat chat = chatService.createGroup(groupChatRequest,user.getUsername());

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }



    @GetMapping("/chat/{chat_id}")
    public ResponseEntity<Chat> findChatByIdHandler(@PathVariable("chat_id") String id){

        ObjectId Id = new ObjectId(id);

        Chat chat = chatService.findChatById(Id);
        if(chat==null){
            throw new RuntimeException("Chat not found");
        }
        return new ResponseEntity<>(chat,HttpStatus.OK);
    }

    @GetMapping("/chat/single/findAll")
    public ResponseEntity<List<Chat>> findAllSingleChatsHandler(@RequestHeader("Authorization") String token){

        Users user = userMainService.findUserByJwt(token);
        if(user!=null){
            List<Chat> chats = chatService.findSingleChatsByUserId(user.getId());

            if(chats!=null){
                return new ResponseEntity<>(chats,HttpStatus.OK);
            }

            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        else {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/chat/group/findAll")
    public ResponseEntity<List<Chat>> findAllGroupChatsHandler(@RequestHeader("Authorization") String token){

        Users user = userMainService.findUserByJwt(token);
        if(user!=null){
            List<Chat> chats = chatService.findGroupChatsByUserId(user.getId());

            if(chats!=null){
                return new ResponseEntity<>(chats,HttpStatus.OK);
            }

            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        else {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }



    @GetMapping("/chat/user/all_chats")
    public ResponseEntity<List<Chat>> findUserChatsHandler(@RequestHeader("Authorization") String token){
        Users user = userMainService.findUserByJwt(token);
        System.out.println(user.getUsername());
        List<Chat> chats = chatService.findAllChatsByUsername(user.getUsername());
        if(chats==null){
            throw new RuntimeException("No chats for the given user");
        }
        return new ResponseEntity<>(chats,HttpStatus.OK);
    }



    @PutMapping("/chat/{chat_id}/add/{user_id}")
    public ResponseEntity<Chat> addUserToChat(@PathVariable("chat_id") String chat_id,
                                              @PathVariable("user_id") String user_id,
                                              @RequestHeader("Authorization") String token
    ){

        ObjectId chatId = new ObjectId(chat_id);
        Users user = userMainService.findUserByJwt(token);
        Chat req_chat = chatService.addUserToGroup(user.getUsername(),chatId,user_id);
        return new ResponseEntity<>(req_chat,HttpStatus.OK);
    }



    @PutMapping("/chat/{chat_id}/remove/{user_id}")
    public ResponseEntity<Chat> removeUserToChat(@PathVariable("chat_id") String chat_id,
                                              @PathVariable("user_id") String user_id,
                                              @RequestHeader("Authorization") String token
    ){
        ObjectId chatId = new ObjectId(chat_id);
        Users user = userMainService.findUserByJwt(token);
        Chat req_chat = chatService.removeFromGroup(user.getUsername(),chatId,user_id);
        return new ResponseEntity<>(req_chat,HttpStatus.OK);
    }



    @DeleteMapping("/chat/delete/{chat_id}")
    public  ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable("chat_id") String chat_id, @RequestHeader("Authorization") String token){

        ObjectId chatId = new ObjectId(chat_id);
        Users user = userMainService.findUserByJwt(token);
        chatService.deleteChat(chatId,user.getUsername());

        ApiResponse apiResponse=new ApiResponse("Deleted chat",true);

        return new ResponseEntity<>(apiResponse,HttpStatus.OK);
    }


}
