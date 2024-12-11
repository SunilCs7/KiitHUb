import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Conversations({ conversation, currentUser }) {
    // Loading the asset folder(public folder) path
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // Using the usestate to handle current user
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                // const res = await axios("/users?userId=", friendId);
                const res = await axios.get(`/users?userId=${friendId}`);
                console.log(res);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [conversation, currentUser]);

    return (
        <div className='conversation flex flex-row gap-2 items-center p-2 my-1 hover:bg-gray-300 hover:cursor-pointer bg-gray-100'>

            <img src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="conversationImg w-[35px] h-[35px] rounded-full object-cover" />

            <span className="conversationName">
                {user?.username}
            </span>
        </div>
    );
}
