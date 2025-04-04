import React from 'react';
import { Home, MessageCircle, Settings, LogOut, Users, Bell } from 'lucide-react';

function SideBar() {
    return (
        <div className="bg-[#2A2B32] text-white w-[5%] p-4 flex flex-col justify-between shadow-lg rounded-md">




            <div className="space-y-4">


                <div className="flex items-center gap-4 p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all">
                    <Home className="w-5 h-5" />

                </div>


                <div className="flex items-center gap-4 p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all">
                    <Users className="w-5 h-5" />

                </div>

                {/*<div className="flex items-center gap-4 p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all">*/}
                {/*    <Bell className="w-5 h-5" />*/}

                {/*</div>*/}

                {/*<div className="flex items-center gap-4 p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all">*/}
                {/*    <Settings className="w-5 h-5" />*/}

                {/*</div>*/}
            </div>



            <div className="flex items-center gap-4 p-2 hover:bg-red-700 rounded-lg cursor-pointer transition-all">
                <LogOut className="w-5 h-5" />

            </div>



        </div>
    );
}

export default SideBar;
