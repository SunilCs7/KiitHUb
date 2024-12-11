import React, { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {

    // Importing the Public Path
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // Handling the user
    const [user, setUser] = useState({});

    const username = useParams().username;

    // Using useEffect() hook to fetch the posts on render of the Post Component
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUsers();
    }, [username]);

    return (
        <div>
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <NavBar />
            </div>

            <div className="profileContainer  grid grid-cols-12">

                {/* Sidebar */}
                <div className="col-span-2">
                    <Sidebar />
                </div>

                {/* Profile Cover page followed by Posts and Rightbar */}
                <div className="profileRight col-span-10">

                    {/* Cover pic, Profile Pic, and User Description */}
                    <div className="profilerightTop">

                        <div className="profileCover h-[320px] relative">

                            <img src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.jpg"} alt="" className="profileCoverImg w-[100%] h-[250px] object-cover" />

                            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profileUserImg w-[150px] h-[150px] object-cover rounded-full absolute left-0 right-0 top-[150px] border-2 border-white m-auto" />

                        </div>

                        <div className="profileInfo flex flex-col gap-1 items-center py-1">
                            <h4 className="profileInfoName text-[30px] font-semibold">
                                {user.username}
                            </h4>

                            <span className='profileInfoDesc text-[18px]'>{user.desc}
                            </span>
                        </div>

                    </div>

                    {/* User Timeline */}
                    <div className="profileRightBottom  border-t-2 border-gray-300 mt-2 rounded-none flex p-2">
                        <div className="flex-9 w-9/12">
                            <Feed username={username} />
                        </div>

                        <div className="flex-3 w-3/12">
                            <Rightbar user={user} />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
