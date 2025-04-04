import React from 'react'
import SideBar from "./subcomponents/SideBar.jsx";
import MainSection from "./subcomponents/MainSection.jsx"
import Chat from "./subcomponents/Chat.jsx"

function HomePage() {
    return (
        <div className="h-screen bg-slate-900 overflow-hidden flex items-center justify-center ">
            <div className="flex flex-row w-[99%] h-[95%] m-4 mt-4 text-white space-x-2">  {/* Adjust width as needed */}
                {/* Your content */}
                <SideBar/>
                <Chat/>
                <MainSection/>
            </div>
        </div>

    )
}

export default HomePage;
