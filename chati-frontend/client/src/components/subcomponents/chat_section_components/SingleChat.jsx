import React, {useEffect, useState} from 'react'
import ChatCard from "../chat_cards/ChatCard.jsx";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {searchUser} from "../../../redux/auth/Action.js";
import {createChat, getUsersChat} from "../../../redux/chat/Action.js";
function SingleChat({setMessaging, setCurrentChat}) {
    const auth = useSelector((store)=>store.auth);
    const chat = useSelector((store)=>store.chat);
    const message = useSelector((store)=>store.message);
    const [query,setQuery] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem("token-chati");



    function handleSearch(keyword){
        dispatch(searchUser({keyword,token}))
    }

    function handleClickChatCard(username,already){
        if(already===false){
            console.log("Clicked");
            setMessaging(true);
            dispatch(createChat({username, token}))
        }
        else{
            setMessaging(true);
        }

    }

    function getUsername(item){
        let admin = auth.reqUser.username;

        let users = item.users;
        for(let user in users){
            let entity = users[user];

            if(entity.username!==admin){
                return entity.username;
            }
        }
        return ""
    }

    useEffect(()=>{
        dispatch(getUsersChat({token}));
    },[chat.createdChat,chat.createdGroup])


    return (
        <div className="bg-[#1C1C1F] text-white w-[25%] flex flex-col rounded-md">

            {/* Header Section */}
            <div className="flex items-center justify-between p-2">
                <h2 className="text-2xl font-bold">Chats</h2>
            </div>


            <div className="relative mb-3 p-2">
                <input
                    type="text"
                    placeholder="Search chat"
                    className="w-full bg-[#2A2B32] text-sm text-white py-1 px-2 rounded focus:outline-none placeholder-gray-500"
                    onChange={(event)=>{
                        setQuery(event.target.value);
                        handleSearch(event.target.value);
                    }}
                    value={query}
                />
            </div>

            {/* Chats List (Placeholder for now) */}
            {
                query==="" && (
                    <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-2 pl-1">
                        {chat.chats?.map((items) => (
                            <div key={items.id} onClick={() => {
                                setCurrentChat(items);
                                handleClickChatCard(items, true)
                            }}>
                                <ChatCard username={getUsername(items)}/>
                            </div>
                        ))}
                    </div>
                )
            }

            {
                query!=="" && (
                    <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-2 pl-1">
                        {auth.searchUser?.map((items) => (
                            <div key={items.id} onClick={() => {
                                setCurrentChat(items)
                                handleClickChatCard(items.username, false)
                            }}>
                                <ChatCard timestamp={items.timestamp} profile_picture={items.profile_picture} username = {items.username} />
                            </div>
                        ))}
                    </div>
                )
            }

        </div>
    );
}

export default SingleChat
