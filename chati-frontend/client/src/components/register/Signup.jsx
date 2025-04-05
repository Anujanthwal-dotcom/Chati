import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {currenteUser, register} from "../../redux/auth/Action.js";
import {store} from "../../redux/redux.store.js";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar,setOpenSnackbar] = useState(false);
    const auth = useSelector((store)=>store.auth);
    const token = localStorage.getItem("token-chati");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleSignup = (e) => {
        e.preventDefault();
        // TODO: Implement sign-up logic here

        const data = {
            "username" : username,
            "password" : password
        }


        console.log("Signup data:", data);
        dispatch(register(data));

        setOpenSnackbar(true);
    };

    const handleSnackbarClose=()=>{
        setOpenSnackbar(false);
    }


    useEffect(()=>{
        if(token) {
            dispatch(currenteUser(token))
        }
    },[dispatch, token]);

    useEffect(()=>{
        if(auth.reqUser?.username){
            navigate("/");
        }
    },[auth.reqUser]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Link to Sign In */}
                <div className="mt-4 text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link to="/signin" className="text-blue-600 hover:underline font-medium">
                        Sign In
                    </Link>
                </div>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Note archived"

            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Signup;
