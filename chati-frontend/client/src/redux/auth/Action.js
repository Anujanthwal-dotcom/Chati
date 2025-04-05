import {BASE_API_URL} from "../../config/api.js";
import {LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER} from "./ActionType.js";

export const register=(data)=>async (dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/user/register`,{
            method:"POST",
            headers :{
                "content-type" : "application/json",
            },
            body : JSON.stringify(data)
        })

        const response = await res.json();
        if(response.token){
            localStorage.setItem("token-chati",response.token);
        }
        console.log("registered",response);
        dispatch({type:REGISTER,payload:response});
    }
    catch (e) {
        console.log(e)
    }
}

export const login=(data)=>async (dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/user/login`,{
            method:"POST",
            headers :{
                "content-type" : "application/json",
            },
            body : JSON.stringify(data)
        })

        const response = await res.json();
        console.log("registered",response);
        if(response.token){
            localStorage.setItem("token-chati",response.token);
        }
        dispatch({type:LOGIN,payload:response});
    }
    catch (e) {
        console.log(e)
    }
}
export const currenteUser=(token)=>async (dispatch)=>{
    console.log(token);
    try {
        const res = await fetch(`${BASE_API_URL}/profile`,{
            method:"GET",
            headers :{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },

        })

        const response = await res.json();
        console.log("got user",response);
        dispatch({type:REQ_USER,payload:response});
    }
    catch (e) {
        console.log(e)
    }
}
export const searchUser=(data)=>async (dispatch)=>{
    console.log("search data ",data);
    console.log(`${BASE_API_URL}/search/${data.keyword}`);
    try {
        const res = await fetch(`${BASE_API_URL}/search/${data.keyword}`,{
            method:"GET",
            headers :{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${data.token}`
            },

        })

        const response = await res.json();
        console.log("searched",response);
        dispatch({type:SEARCH_USER,payload:response});
    }
    catch (e) {
        console.log(e)
    }
}

export const updateUser=(data)=>async (dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/update`,{
            method:"POST",
            headers :{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${data.token}`
            },
            body : JSON.stringify(data)
        })

        const response = await res.json();
        console.log("registered",response);
        dispatch({type:UPDATE_USER,payload:response});
    }
    catch (e) {
        console.log(e)
    }
}

export const logoutUser=()=>async (dispatch)=>{
    localStorage.removeItem("token-chati");
    dispatch({type: LOGOUT, payload: null})
    dispatch({type:REQ_USER,payload:null})
}
