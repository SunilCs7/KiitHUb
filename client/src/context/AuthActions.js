export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});

// Following a user
export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

// Unfollowing a user
export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});