package com.app.chati.Model;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "chats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chat {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String chat_name;
    private String chat_image;
    private boolean is_group;

    @DBRef
    private List<Users> admins = new ArrayList<>();


    /// Need to look into these references
    @DBRef
    private Users created_by;

    @DBRef
    private List<Users> users = new ArrayList<>();

    @DBRef
    private List<Message> messages = new ArrayList<>();
}
