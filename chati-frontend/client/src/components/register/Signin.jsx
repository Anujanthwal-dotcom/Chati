import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {currenteUser, login} from "../../redux/auth/Action.js"; // Add this import

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [openSnackbar,setOpenSnackbar] = useState(false);
    const token = localStorage.getItem("token-chati");
    const auth = useSelector((store)=>store.auth);
    const navigate = useNavigate();


    const handleSignIn = (e) => {
        e.preventDefault();
        // TODO: Implement sign-in logic here
        const data = {
            "username" : username,
            "password" : password
        }


        console.log("Signup data:", data);
        dispatch(login(data));

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
    },[auth.reqUser, navigate]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
                <form onSubmit={handleSignIn} className="space-y-4">
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
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                {/* Create Account Link */}
                <div className="mt-4 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                        Create one
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

export default Signin;
