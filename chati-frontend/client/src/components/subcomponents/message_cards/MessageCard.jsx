import React from 'react';

function MessageCard({ message, sender, timestamp, isSentByUser }) {
    return (
        <div
            className={`flex ${isSentByUser ? 'justify-end' : 'justify-start'} w-full`}
        >
            <div
                className={`max-w-xs bg-[#1C1C1F] text-white p-2 rounded-md text-xs shadow-sm 
                ${isSentByUser ? 'bg-[#3A3B3F]' : 'bg-[#2E2E33]'}`}
            >
                <div className="text-gray-400 mb-1 text-[10px]">{sender}</div>
                <div>{message}</div>
                <div className="text-gray-500 text-[10px] mt-1 text-right">{timestamp}</div>
            </div>
        </div>
    );
}

export default MessageCard;
