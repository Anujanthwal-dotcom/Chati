import {BASE_API_URL} from "../../config/api.js";
import {CREATE_NEW_MESSAGE, GET_ALL_MESSAGE} from "./ActionType.js";



export const createMessage=(messageData)=>async(dispatch)=>{
    try{
        const res = await fetch(`${BASE_API_URL}/message/send`,{
            method:"POST",
            headers:{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${messageData.token}`
            },
            body:JSON.stringify(messageData.data)
        })

        const response = await res.json();
        console.log(response);
        dispatch({type:CREATE_NEW_MESSAGE,payload:response})
    }catch (e){
        console.log("Error in creating chat"+e);
    }
}

export const getAllMessage=(messageData)=>async(dispatch)=>{
    try{
        const res = await fetch(`${BASE_API_URL}/message/get/${messageData.chatId}`,{
            method:"GET",
            headers:{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${messageData.token}`
            },

        })

        const response = await res.json();
        console.log(response);
        dispatch({type:GET_ALL_MESSAGE,payload:messageData})
    }catch (e){
        console.log("Error in creating chat"+e);
    }
}