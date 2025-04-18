import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {authReducer} from "./auth/Reducer.js";
import {chatReducer} from "./chat/Reducer.js";
import {messageReducer} from "./message/Reducer.js";

const rootReducer = combineReducers({
    auth:authReducer,
    chat:chatReducer,
    message:messageReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

