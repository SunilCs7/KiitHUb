import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    // Replace useHistory with useNavigate
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        // Checking if the passwords are correct(Password and Confirm Password)
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords do not match");
        } else {
            // Check if email ends with '@kiit.ac.in'
            const emailPattern = /@kiit\.ac\.in$/;
            if (!emailPattern.test(email.current.value)) {
                alert("Please use your university email with @kiit.ac.in domain.");
                return;
            }
            // Storing user data
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };

            try {
                await axios.post("/auth/register", user);
                navigate("/login"); // Use navigate instead of history.push
            } catch (err) {
                console.log(err.message);
            }
        }
    };

    return (
        <div className="login w-[100vw] h-[100vh] bg-gray-200 flex items-center justify-center">

            <div className="loginWrapper w-[70%] h-[70%] bg-green-200 flex gap-2">
                <div className="loginLeft flex-1 flex-col">
                    <h3 className="loginLogo text-[50px] font-bold text-blue-500 my-2">KIIT Hub</h3>
                    <span className="loginDesc text-[24px]">Connect with friends around you</span>
                </div>
                <div className="loginRight flex-1 flex-col justify-center">

                    <form
                        onSubmit={handleClick}
                        className="loginBox h-[400px] p-[20px] bg-white rounded-[10px] flex flex-col justify-between"
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            ref={username}
                            required
                            className="loginInput h-[50px] rounded-[10px] border border-1 border-gray-500 text-[18px] pl-2 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            ref={email}
                            required
                            className="loginInput h-[50px] rounded-[10px] border border-1 border-gray-500 text-[18px] pl-2 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            ref={password}
                            required
                            minLength="6"
                            className="loginInput h-[50px] rounded-[10px] border border-1 border-gray-500 text-[18px] pl-2 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            ref={passwordAgain}
                            required
                            className="loginInput h-[50px] rounded-[10px] border border-1 border-gray-500 text-[18px] pl-2 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="loginButton h-[50px] rounded-[10px] border-0 text-[20px] font-semibold cursor-pointer bg-purple-500 hover:bg-purple-600 text-white"
                        >
                            Signup
                        </button>
                        <button
                            className="loginRegisterButton h-[50px] rounded-[10px] border-0 text-white text-[15px] font-semibold cursor-pointer bg-green-500 hover:bg-green-600 w-[60%] self-center flex items-center justify-center"
                        >

                            {/* Redirect to Login Page */}
                            <Link to="/login">
                                <p className="text-center">Log into your account</p>
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
