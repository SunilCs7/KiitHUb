import axios from "axios"

// Register API call
export const registerCall = async (userCredential, dispatch) => {
    dispatch({ type: "REGISTER_START" });

    try {
        const res = await axios.post("/auth/register", userCredential);
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    }
    catch (err) {
        dispatch({ type: "REGISTER_FAILURE", payload: err });
    }
};

// Login API call
export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });

    try {
        const res = await axios.post("/auth/login", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }
    catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};
