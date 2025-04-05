import React from 'react';
import SingleChat from "./chat_section_components/SingleChat.jsx";
import GroupChat from "./chat_section_components/GroupChat.jsx";
import Profile from "./profile/Profile.jsx";

function Chat({setMessaging, setCurrentChat,isSingle,profile}) {


    if(profile===true){
        return <Profile/>
    }
    else{
        if(isSingle){
            return <SingleChat setMessaging={setMessaging} setCurrentChat={setCurrentChat}/>
        }

        if(!isSingle){
            return <GroupChat setMessaging={setMessaging} setCurrentChat={setCurrentChat}/>
        }
    }



}

export default Chat;
