package com.app.chati.Controller;


import com.app.chati.Model.Message;
import com.app.chati.Model.Users;
import com.app.chati.Request.SendMessageRequest;
import com.app.chati.Response.ApiResponse;
import com.app.chati.Service.MessageService;
import com.app.chati.Service.UserMainService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserMainService userMainService;

    @PostMapping("/message/send")
    public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest req,
                                                      @RequestHeader("Authorization") String token){
        Users user = userMainService.findUserByJwt(token);
        req.setUsername(user.getUsername());
        Message message = messageService.sendMessage(req);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/message/get/{chat_id}")
    public ResponseEntity<List<Message>> getChatMessagesHandler(@PathVariable("chat_id") String chat_id,
                                                          @RequestBody SendMessageRequest req,
                                                          @RequestHeader("Authorization") String token){
        ObjectId chatId =new ObjectId(chat_id);
        Users user = userMainService.findUserByJwt(token);
        List<Message> message = messageService.getChatMessages(chatId,user.getUsername());

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/message/delete/{message_id}")
    public ResponseEntity<ApiResponse> deleteMessageHandler(@PathVariable("message_id") String message_id,
                                                            @RequestHeader("Authorization") String token){

        ObjectId messageId = new ObjectId(message_id);
        Users user = userMainService.findUserByJwt(token);
        messageService.deleteMessage(messageId,user.getUsername());

        ApiResponse apiResponse = new ApiResponse("Message is deleted", true);
        return new ResponseEntity<>(apiResponse,HttpStatus.OK);
    }
}
