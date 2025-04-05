import React, {useState} from 'react'
import SideBar from "./subcomponents/SideBar.jsx";
import Chat from "./subcomponents/Chat.jsx"
import MainSectionComponent from "./subcomponents/MainSectionComponent.jsx";

function HomePage() {

    let [isMessaging, setIsMessaging] = useState(false);
    let [currentChat, setCurrentChat] = useState(null);
    let [isSingle,setIsSingle] = useState(true);
    let [profile,setProfile] = useState(false);
    return (
        <div className="h-screen bg-gray-900 overflow-hidden flex items-center justify-center ">
            <div className="flex flex-row w-[99%] h-[95%] m-4 mt-4 text-white space-x-2">  {/* Adjust width as needed */}
                {/* Your content */}
                <SideBar setIsSingle={setIsSingle} setProfile={setProfile}/>
                <Chat setMessaging={setIsMessaging} profile={profile} setCurrentChat={setCurrentChat} isSingle={isSingle}/>
                <MainSectionComponent isMessaging={isMessaging} currentChat={currentChat}/>

            </div>
        </div>

    )
}

export default HomePage;
