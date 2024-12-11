import React, { useContext, useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import Conversations from '../components/Conversations'
import Message from '../components/Message'
import { Send } from '@mui/icons-material';
import ChatOnline from '../components/ChatOnline';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { io } from "socket.io-client"

export default function Messenger() {
    // To set the current conversations
    const [conversations, setConversations] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState("");

    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    // To use the socket
    const socket = useRef(io("ws://localhost:8900"));

    // Checking current user(after logging)
    const { user } = useContext(AuthContext);

    // To get reference to the last message sent in a Conversation
    const scrollRef = useRef();

    // Avoiding again and again assigning whenever Messenger is rendered
    useEffect(() => {
        socket.current = io("ws://localhost:8900");

        // Get the message
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    // Whenever arrivalMessage and currentChat changes, do this
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((previous) => [...previous, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    // For TCP(web-socket) connection
    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.followings.filter((f) => users.some((u) => u.userId === f))
            );
        });
    }, [user]);

    // To get all the conversations from the server side
    useEffect(() => {
        // Changed: Added if condition here: to avoid the error
        if (user?._id) {
            const getConversations = async () => {
                try {
                    const res = await axios.get("/conversations/" + user._id);
                    console.log(res);
                    setConversations(res.data);
                }
                catch (err) {
                    console.log(err);
                }
            };
            getConversations();
        }
    }, [user._id]);

    // To get the Messages in a Conversation
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err)
            }
        };

        getMessages();
    }, [currentChat]);

    // Function to handle the Message/Submit Button
    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        // Finding the receiverId
        const receiverId = currentChat.members.find(member => member !== user._id);

        // Sending the message
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        });

        try {
            const res = await axios.post("/messages", message);

            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }

    };

    // TO automatically scroll to the last message in a Conversation
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div>
            <NavBar />

            {/* Messenger */}
            <div className="messenger h-[calc(100vh-72px)] grid grid-flow-col grid-cols-12 gap-2 rounded-none">

                {/* Chat Menu(Search, List of Conversations) */}
                <div className="chatMenu col-span-3 rounded-none overflow-y-scroll">
                    <div className="chatMenuWrapper py-2 px-1 h-full flex flex-col gap-2">
                        <input placeholder='Search for Friends' className='focus:outline-none border-b-gray-500 pl-2' />

                        {/* Conversations */}
                        {/* Mapping the conversations from server response */}
                        {
                            conversations.map((c) => (
                                <div key={c._id} onClick={() => { setCurrentChat(c) }} className="">
                                    <Conversations conversation={c} currentUser={user} />
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Chat box(Message typing area) */}
                <div className="chatBox col-span-6 rounded-none w-full h-[calc(100vh-72px)] bg-gray-200">
                    <div className="chatBoxWrapper p-3 h-full flex flex-col justify-between">
                        {
                        /* Checks whether a/any conversation is selected */}
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop pr-1 overflow-y-scroll">
                                        {/* Mapping the messages of a conversations */}
                                        {
                                            messages.map(m => (
                                                <div ref={scrollRef}>
                                                    <Message message={m} own={m.sender === user._id} />
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className="chatBoxBottom bg-gray-50 flex gap-2 justify-between items-center p-1">
                                        <textarea placeholder='Write something' onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className='chatMessageInput pl-2 p-1 flex-10 w-full focus:outline-0'></textarea>

                                        {/* Send Buttion */}
                                        <button type="submit" onClick={handleSubmit} className="text-green-500 flex-2 hover:text-green-600"><Send /></button>
                                    </div>
                                </> :
                                <span className="noConversationText flex justify-center items-center py-1 text-3xl text-gray-400 w-[100%]">Open a Conversation</span>
                        }

                    </div>

                </div>

                {/* Online Friends */}
                <div className="chatOnline col-span-3 rounded-none">
                    <div className="chatOnlineWrapper p-3 h-[calc(100vh-72px)] overflow-y-scroll">

                        {/* Online Friends for chatting */}
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>

            </div>
        </div>
    )
}
