import {BASE_API_URL} from "../../config/api.js";
import {CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT} from "./ActionType.js";

export const createChat=(dataD)=>async(dispatch)=>{
    console.log(dataD.username);
    try{
        const res = await fetch(`${BASE_API_URL}/chat/single_chat/create`,{
            method:"POST",
            headers:{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${dataD.token}`
            },
            body:JSON.stringify({"username":dataD.username})
        })

        const response = await res.json();
        console.log(response);
        dispatch({type:CREATE_CHAT,payload:dataD})
        console.log("chat created");
    }catch (e){
        console.log("Error in creating chat"+e);
    }
}

export const createGroup=(data)=>async(dispatch)=>{
    try{
        const res = await fetch(`${BASE_API_URL}/chat/group_chat/create`,{
            method:"POST",
            headers:{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${data.token}`
            },
            body:JSON.stringify(data.data)
        })

        const response = await res.json();
        console.log(response);
        dispatch({type:CREATE_GROUP,payload:data})
    }catch (e){
        console.log("Error in creating chat"+e);
    }
}

export const getUsersChat=(data)=>async(dispatch)=>{
    try{
        const res = await fetch(`${BASE_API_URL}/chat/user/all_chats`,{
            method:"GET",
            headers:{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${data.token}`
            },
        })

        const response = await res.json();
        console.log("users chat",response);
        dispatch({type:GET_USERS_CHAT,payload:response})
    }catch (e){
        console.log("Error in creating chat"+e);
    }
}