import React, { useContext, useEffect, useState } from "react";
import { Feed, Chat, PlayCircle, Group, Bookmark, Help, Work, Event, School, Interests } from '@mui/icons-material';
// import { Users } from '../data/DummyData'
import Friend from './Friend';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Sidebar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // Fetching the current user's friends (Added)
    // State to hold friend list
    const [friends, setFriends] = useState([]);

    const { user: currentUser } = useContext(AuthContext);

    // Fetching friends of the current user
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`/users/friends/${currentUser._id}`);
                setFriends(friendList.data);
            } catch (err) {
                console.error(err);
            }
        };
        getFriends();
    }, [currentUser]);

    return (
        <div className="sidebar h-[calc(100vh-4rem)] overflow-y-scroll sticky top-16">
            <div className="sidebarWrapper p-2 flex flex-col gap-3">

                {/* Links(Feed, Chats, Videos, Groups, Saved, Questions, Events, Jobs. etc) */}
                <ul className="sidebarList flex flex-col gap-1 md:gap-2">
                    <li className="flex gap-2 cursor-pointer p-1.5 hover:bg-green-500 hover:text-white">
                        <Feed />
                        <span className="">Feed</span>
                    </li>

                    <li className="flex gap-2 cursor-pointer p-1.5 hover:bg-green-500 hover:text-white">
                        <Chat />
                        <span className="">Chats</span>
                    </li>

                    <li className="flex gap-2 cursor-pointer p-1.5 hover:bg-green-500 hover:text-white">
                        <PlayCircle />
                        <span className="">Videos</span>
                    </li>

                    <li className="flex gap-2 cursor-pointer p-1.5 hover:bg-green-500 hover:text-white">
                        <Group />
                        <span className="">Groups</span>
                    </li>

                    <li className="flex gap-2 cursor-pointer p-1.5 hover:bg-green-500 hover:text-white">
                        <Bookmark />
                        <span className="">Saved</span>
                    </li>

                    <li className="flex gap-2 cursor-pointer p-1.5 hover:bg-green-500 hover:text-white">
                        <Help />
                        <span className="">Questions</span>
                    </li>

                    <li className="flex gap-2 cursor-pointer p-1.5 hover:bg-green-500 hover:text-white">
                        <Work />
                        <span className="">Jobs</span>
                    </li>

                    <li className="flex gap-2 cursor-pointer p-1.5 hover:bg-green-500 hover:text-white">
                        <Event />
                        <span className="">Events</span>
                    </li>

                    <li className="flex gap-2 cursor-pointer p-1.5 hover:bg-green-500 hover:text-white">
                        <School />
                        <span className="">Courses</span>
                    </li>
                    <li className="">
                        <Interests />
                        Internship

                    </li>


                </ul>

                {/* Show More Button */}
                <button className='bg-green-500 text-white py-1 px-2 sm:text-[10px] sm:p-1'>Show More...</button>
                <hr />

                {/* Friend List */}
                <ul className="friendList flex flex-col gap-4">

                    {/* <li className="flex gap-3 items-center">
                        <img src="/assets/person/1.jpeg" alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                        <span className="friendName">Jolie</span>
                    </li> */}
                    {
                        // Users.map(u => (
                        //     <Friend key={u.id} user={u} />
                        // ))
                        friends.map(friend => (
                            <Friend key={friend._id} user={friend} />
                        ))
                    }


                </ul>
            </div>
        </div>
    )
}
