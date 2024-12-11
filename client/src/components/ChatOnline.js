import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // All friends(including followings)
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/users/friends/" + currentId);
            setFriends(res.data);
        };

        getFriends();
    }, [currentId]);

    // Filtering the users
    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    // Function to handle the click on online friends
    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='chatOnline mt-2'>

            {/* Mapping the online friends */}
            {
                onlineFriends.map((online) => (

                    <div onClick={() => handleClick(online)} className="chatOnlineFriend flex gap-3 items-center cursor-pointer">

                        <div className="chatOnlineImgContainer p-1 flex gap-2 relative">
                            <img src={online?.profilePicture ? PF + online.profilePicture : PF + "person/noAvatar.png"} alt="" className="chatOnlineImg w-[30px] h-[30px] rounded-full object-cover" />

                            <div className="chatOnlineBadge w-[9px] h-[9px] bg-green-500 absolute top-1 left-[25px] border border-1 border-white"></div>
                        </div>

                        <span className="conversationName">{online?.username}</span>
                    </div>
                ))
            }

        </div>
    )
}
