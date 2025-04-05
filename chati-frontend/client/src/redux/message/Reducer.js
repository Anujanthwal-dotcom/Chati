import {CREATE_NEW_MESSAGE, GET_ALL_MESSAGE} from "./ActionType.js";

const initialValue = {
    messages:[],
    newMessage:null
}

export const messageReducer = (store = initialValue,{type,payload})=>{
    if(type === CREATE_NEW_MESSAGE){
        return {...store,newMessage: payload};
    }
    else if(type === GET_ALL_MESSAGE){
        return {...store,messages: payload};
    }
    else return store;
}