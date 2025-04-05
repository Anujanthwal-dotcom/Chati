import React, {useEffect, useState} from 'react';
import {Send, Smile} from 'lucide-react';
import MessageCard from '../message_cards/MessageCard.jsx';
import {useDispatch, useSelector} from "react-redux";
import {createMessage} from "../../../redux/message/Action.js";
function MessageSection({currentChat}) {

    const [messageContent,setMessageContent] = useState("");
    const [prevChats, setPrevChats] = useState([]);
    const [chatUserName,setChatUserName] = useState(null);

    const auth = useSelector((store)=>store.auth);
    const dispatch = useDispatch();
    const token  = localStorage.getItem("token-chati")

    console.log("current chat",currentChat.id);
    function handleSendMessage(){

        dispatch(createMessage({token, data: {chatId: currentChat.id, content: messageContent}}))
    }

    function getUsername(){
        let admin = auth.reqUser.username;

        let users = currentChat.users;
        for(let user in users){
            let entity = users[user];

            if(entity.username!==admin){
                return entity.username;
            }
        }
        return ""
    }

    return (
        <div className="bg-[#1C1C1F] text-white w-[70%] flex flex-col border-gray-800">

            {/* Top Bar */}
            <div className="flex items-center gap-3 mb-3 bg-[#2A2B32] p-2 rounded-md shadow-sm">
                <img
                    src={null}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                />
                <div>
                    <h2 className="text-sm font-medium">{getUsername()}</h2>
                </div>
            </div>

            {/* Messages Display Section */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 mb-3">
                {prevChats.map(chat => (
                    <MessageCard
                        key={chat.id}
                        message={chat.message}
                        sender={chat.sender} // Make sure your messages have a sender field
                        timestamp={new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        isSentByUser={chat.sender !== chatUserName} // Compare sender with the current user
                    />
                ))}
            </div>

            {/* Message Input Bar */}
            <div className="flex items-center gap-1 bg-[#2A2B32] p-2 rounded-md">
                <button className="hover:bg-[#3A3B3F] p-1 rounded-full transition-all">
                    <Smile className="w-4 h-4 text-gray-400" />
                </button>
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1  bg-transparent border-none text-xs text-white placeholder-gray-500 focus:outline-none"
                    onChange={(e)=>setMessageContent(e.target.value)}
                    value={messageContent}
                    onKeyPress={(e)=>{if(e.key==="Enter"){handleSendMessage(); setMessageContent("") }}}
                />
                <button className="hover:bg-[#3A3B3F] p-1 rounded-full transition-all">
                    <Send className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </div>
    );
}

export default MessageSection;
