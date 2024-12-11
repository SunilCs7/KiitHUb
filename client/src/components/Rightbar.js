import React, { useContext, useEffect, useState } from "react";
// import { Celebration } from '@mui/icons-material';
import { Add, Remove } from '@mui/icons-material';

import { Users } from "../data/DummyData"
import Online from "./Online"
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Rightbar({ user }) {

    // Importing the Public Path
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // Fetching the Current user
    const { user: currentUser, dispatch } = useContext(AuthContext);

    // Managing the state for follow and unfollow a user
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

    // Managing the state of the friendslist, initially empty
    const [friends, setFriends] = useState([]);

    // For Friends List section
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        };
        getFriends();
    }, [user]);

    // Follow/Unfollow handler function
    const handleClick = async () => {
        try {
            // Checking if the user is already followed by current user or not
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            }
            else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
        } catch (err) {
            console.log(err);
        }
        setFollowed(!followed);
    }

    // 
    const HomeRightbar = () => {
        return (
            <>
                {/* Birthday */}
                <div className="birthdayContainer flex gap-2 items-center custom-box-shadow my-2 mx-1 px-1 py-2">
                    <img src="assets/gift.png" alt="" className="w-[25px] h-[25px]" />

                    <span className="birthdayText text-[13px]">
                        <strong>Sunil Yadav</strong> and <strong>69 other friends</strong> have birthday today
                    </span>
                </div>


                {/* Sponsered Ad */}
                <div className="mx-1 my-3">
                    <img src="assets/ad.png" alt="" className="box-border w-full" />
                </div>


                {/* Online Friends */}
                <h4 className="rightbarTitle mt-4 font-semibold">
                    Online Friends
                </h4>

                <ul className="onlineFriendList my-3 overflow-hidden">

                    {/* Online friends list */}
                    {/* Using Online.js for displaying the online friends */}
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}

                </ul>
            </>
        )
    }

    // 
    const ProfileRightbar = () => {
        return (
            <>

                {/* Logic to follow/unfollow a user */}
                {
                    user.username !== currentUser.username && (
                        <button onClick={handleClick} className="rightbarFollowButton bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 text-[14px] md:text-[18px] flex items-center focus:outline-none">

                            {followed ? "Unfollow" : "Follow"}
                            {followed ? <Remove /> : <Add />}

                        </button>
                    )
                }

                <h4 className="rightbarTitle text-[18px] font-semibold my-2">
                    User Information
                </h4>

                <div className="rightbarInfo my-4">
                    <div className="rightbarInfoItem my-2">
                        <span className="rightbarInfoKey font-semibold mr-2 text-gray-600">City:
                        </span>

                        <span className="rightbarInfoValue font-light">{user.city}
                        </span>
                    </div>


                    <div className="rightbarInfoItem my-2">
                        <span className="rightbarInfoKey font-semibold mr-2 text-gray-600">From:
                        </span>

                        <span className="rightbarInfoValue font-light">{user.from}
                        </span>
                    </div>


                    <div className="rightbarInfoItem my-2">
                        <span className="rightbarInfoKey font-semibold mr-2 text-gray-600">Relationship:
                        </span>

                        <span className="rightbarInfoValue font-light">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}
                        </span>
                    </div>

                </div>

                {/* User Friends(Whom you follow and they follow back) */}
                <h4 className="rightbarTitle text-[18px] font-semibold my-2">
                    User Friends
                </h4>

                <div className="rightbarFollowings flex gap-2 flex-wrap justify-between">


                    {/* Component for FriendList */}
                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} >
                            <div className="rightbarFollowing flex flex-col gap-2 cursor-pointer">
                                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg w-[100px] h-[100px] object-cover rounded-md" />

                                <span className="rightbarFollowingName">
                                    {friend.username}
                                </span>
                            </div>
                        </Link>
                    ))}

                </div>

            </>
        )
    }

    return (
        <div className="rightbar h-[calc(100vh-4rem)] overflow-y-scroll sticky top-16">

            <div className="rightbarContainer mt-2">

                {/* Logic of either to display Homepage ot Profile page */}
                {
                    user ? <ProfileRightbar /> : <HomeRightbar />
                }

            </div>

        </div>
    )
}
