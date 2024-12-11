import React, { useContext, useRef } from 'react';
import { loginCall } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom';

export default function Login() {

    // Using this hook to send data
    const email = useRef();
    const password = useRef();

    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    // Handle Form Submit
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    };

    return (
        <div className="login w-[100vw] h-[100vh] bg-gray-200 flex items-center justify-center">

            <div className="loginWrapper w-[70%] h-[70%] bg-green-200 flex gap-2">

                <div className="loginLeft flex-1 flex-col">
                    <h3 className="loginLogo text-[50px] font-bold text-blue-500 my-2">KIIT Hub</h3>
                    <span className="loginDesc text-[24px]">Connect with friends around you</span>
                </div>

                {/* Login Form */}
                <div className="loginRight flex-1 flex-col justify-center">

                    <form className="loginBox  h-[300px] p-[20px] bg-white rounded-[10px] flex flex-col justify-between" onSubmit={handleClick}>
                        <input type="email" placeholder="Email" className="loginInput h-[50px] rounded-[10px] border border-1 border-gray-500 text-[18px] pl-2 focus:outline-none" ref={email} required />

                        <input type="password" placeholder="Password" className="loginInput h-[50px] rounded-[10px] border border-1 border-gray-500 text-[18px] pl-2 focus:outline-none" ref={password} required minLength="6" />

                        <button type="submit" disabled={isFetching} className="loginButton h-[50px] rounded-[10px] border-0 text-[20px] font-semibold cursor-pointer bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed">{isFetching ? <CircularProgress color='success' /> : "Log In"}</button>

                        <span className="loginForgot text-center text-blue-500 cursor-pointer hover:text-blue-600">Forgot Password</span>

                        {/* Redirect to Register Page */}
                        <Link to="/register">
                            <div className="loginRegisterButton h-[50px] rounded-[10px] border-0 text-white text-[15px] font-semibold cursor-pointer bg-green-500 hover:bg-green-600 w-[60%] self-center flex items-center justify-center"><p className="text-center">{isFetching ? <CircularProgress color='success' /> : "Create a New Account"}</p></div>
                        </Link>
                    </form>

                </div>

            </div>

        </div >
    )
}
