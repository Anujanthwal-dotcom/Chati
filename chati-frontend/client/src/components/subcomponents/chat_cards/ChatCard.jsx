import React from 'react'
import {User} from "lucide-react";

function ChatCard({username,profile_picture,timestamp}) {
    return (
        <div className="flex items-center justify-between p-3 group cursor-pointer hover:bg-[#2A2B32]  transition-all duration-300 shadow-sm">
            <div className="flex items-center space-x-4 w-full">
                <div className="flex-shrink-0">

                    {
                        profile_picture && (
                            <img
                                className="h-14 w-14 rounded-full object-cover border-2 border-gray-700"
                                src={profile_picture}
                                alt={`${username}'s profile`}
                            />
                        )
                    }


                    {
                        !profile_picture && <User className={`w-7 h-7`}/>
                    }

                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-white">{username}</p>
                        <p className="text-xs text-gray-400">{timestamp}</p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ChatCard
