import React, {useEffect} from 'react';
import {Home, LogOut, Users,Settings} from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import {currenteUser, logoutUser} from "../../redux/auth/Action.js";
import {useNavigate} from "react-router-dom";

function SideBar({setIsSingle,setProfile}) {

    const dispatch = useDispatch();
    const auth = useSelector((store)=>store.auth);
    const navigate =useNavigate();
    const token = localStorage.getItem("token-chati");

    function handleLogout(){
        dispatch(logoutUser());
        navigate("/signin");
    }

    useEffect(() => {
        if(!auth.reqUser){
            navigate("/signin");
        }
    },[auth.reqUser, navigate]);

    useEffect(()=>{
        dispatch(currenteUser(token));
    },[token])

    return (
        <div className="bg-[#2A2B32] text-white w-[5%] p-4 flex flex-col justify-between shadow-lg rounded-md">




            <div className="space-y-4">


                <div onClick={()=>{setProfile(false);setIsSingle(true)}} className="flex items-center gap-4 p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all">
                    <Home className="w-5 h-5" />

                </div>


                <div onClick={()=>{setProfile(false);setIsSingle(false)}} className="flex items-center gap-4 p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all">
                    <Users className="w-5 h-5" />

                </div>

                {/*<div className="flex items-center gap-4 p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all">*/}
                {/*    <Bell className="w-5 h-5" />*/}

                {/*</div>*/}

                <div onClick={()=>setProfile(true)} className="flex items-center gap-4 p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all">
                    <Settings className="w-5 h-5" />

                </div>
            </div>



            <div onClick={handleLogout} className="flex items-center gap-4 p-2 hover:bg-red-700 rounded-lg cursor-pointer transition-all">
                <LogOut className="w-5 h-5" />

            </div>



        </div>
    );
}

export default SideBar;
