import React from 'react';

function PromoSection() {
    return (
        <div className="bg-[#2A2B32] text-white flex-1 p-3 flex items-center justify-center w-[70%] rounded-md">

            {/* Promotional Text */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">Welcome to Chati</h1>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                    The Ultimate Messaging Platform. Connect, Communicate, and Collaborate with ease. Enjoy real-time messaging with a clean and minimalistic interface.
                </p>
            </div>
        </div>
    );
}

export default PromoSection;
