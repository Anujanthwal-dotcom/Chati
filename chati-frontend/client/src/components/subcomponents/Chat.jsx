import React from 'react';
import { Plus } from 'lucide-react';

function Chat() {
    return (
        <div className="bg-[#1C1C1F] text-white w-[28%] p-2 flex flex-col border-l border-gray-800 rounded-md">

            {/* Header Section */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Chats</h2>
            </div>


            <div className="relative mb-3">
                <input
                    type="text"
                    placeholder="Search recent chat"
                    className="w-full bg-[#2A2B32] text-sm text-white py-1 px-2 rounded focus:outline-none placeholder-gray-500"
                />
            </div>

            {/* Chats List (Placeholder for now) */}
            <div className="flex-1 overflow-y-auto space-y-1">

            </div>
        </div>
    );
}

export default Chat;
