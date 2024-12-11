const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

// Function to filter the userId and socketId
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

// Removing user
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

// Finding the specific user
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

// Connecting the socket
io.on("connection", (socket) => {
    // When Connected
    console.log("A user connected");

    // Take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // Send and Get Messages
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(userId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    // When Disconnected
    socket.on("disconnect", () => {
        console.log("A user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});