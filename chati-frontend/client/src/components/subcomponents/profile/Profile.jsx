import React, { useState } from 'react';
import {useSelector} from "react-redux";

function Profile() {
    const auth = useSelector((store)=>store.auth);

    const [formData, setFormData] = useState({
        username: auth.reqUser.username, // Default username or fetched from backend
        profilePicture: null,
        profilePictureUrl: auth.reqUser.profile_picture, // Placeholder image or fetched from backend
    });

    console.log(formData);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicture') {
            const file = files[0];
            setFormData({
                ...formData,
                profilePicture: file,
                profilePictureUrl: URL.createObjectURL(file) // Show preview of the uploaded image
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Here, you can make your API call to update the profile
    };

    return (
        <div className="bg-[#1C1C1F] text-white w-[25%] p-4 flex flex-col rounded-md space-y-4">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Settings</h2>
            </div>

            {/* Profile Change Form */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">

                {/* Profile Picture Section */}
                <div className="flex flex-col items-center space-y-2">
                    <img
                        src={formData.profilePictureUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border border-gray-500"
                    />
                    <label className="text-sm text-gray-400">Change Profile Picture</label>
                    <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                        className="text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                </div>

                {/* Username Input */}
                <div className="w-full">
                    <label className="block mb-1 text-sm">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="w-full bg-[#2A2B32] text-sm text-white py-1 px-2 rounded focus:outline-none placeholder-gray-500"
                    />
                </div>

                {/* Save Changes Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default Profile;
