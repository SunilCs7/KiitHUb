import React, { useContext } from "react";
import { MoreVert, Comment } from '@mui/icons-material';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// For time and date
import { format } from 'timeago.js';
import { AuthContext } from "../context/AuthContext";

export default function Post({ post }) {
    // Using useState() hook to like/unlike the post
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    // Fetching the current user(using the nickname as currentUser)
    const { user: currentUser } = useContext(AuthContext);

    // Maintaining the User data
    const [user, setUser] = useState({});

    // Loading the Public Path
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // Added state for managing dropdown visibility
    const [showOptions, setShowOptions] = useState(false); // **Update**

    // Using useEffect() hook to fetch the posts on render of the Post Component
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            // const res = await axios.get(`/users/${post.userId}`);
            setUser((res.data));
        };
        fetchUsers();
    }, [post.userId]);


    // To check if the user has already liked the post or not
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);


    // Function to handle Like Count
    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {
            console.log(err);
        }

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    // Function to handle delete API call and client-side removal
    const handleDelete = async () => { // **Update**
        try {
            await axios.delete(`/posts/${post._id}`, { data: { userId: currentUser._id } });
            alert("Post deleted successfully");
            window.location.reload(); // Reloading to update the UI after post deletion
        } catch (err) {
            console.log(err);
            alert("Failed to delete the post");
        }
    };

    return (
        <div className='post custom-box-shadow-faded mx-2 my-8 px-2 py-1'>

            {/* Post Container */}
            <div className="postContainer flex flex-col gap-1 mt-4">

                {/* Profile Picture, Username, Post Date and More*/}
                <div className="postTop flex gap-1 p-1 items-center justify-between mx-2 bg-gray-100">
                    <div className="postTopLeft flex gap-3 items-center justify-between m-2">

                        <Link to={`profile/${user.username}`}>
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="postProfileImg w-[40px] max-w-{20%} h-[40px] rounded-full object-cover" />
                        </Link>

                        <span className="postUsername text-[15px]">
                            {user.username}
                        </span>

                        <span className="postDate text-[14px]">
                            {format(post.createdAt)}
                        </span>
                    </div>

                    {/* Added dropdown menu for MoreVert icon */}
                    <div className="postTopRight relative cursor-pointer text-gray-500 hover:text-gray-700"> {/* **Update** */}
                        <MoreVert onClick={() => setShowOptions(!showOptions)} /> {/* Toggle dropdown */}

                        {/* Dropdown Menu */}
                        {showOptions && ( // Conditional rendering for dropdown
                            <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded shadow-lg w-32 text-sm">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Post Details (Text, Photo/Videos)*/}
                <div className="postCenter mx-2 p-1">
                    <div className="postContent">
                        <span className="postText">{post?.desc}</span>

                        <img src={PF + post.img} alt="" className="postImg max-h-[100%] object-contain rounded-none" />
                    </div>
                </div>


                {/* Like/Love Count, Comment*/}
                <div className="postBottom mx-2 p-1 flex justify-between items-center">

                    {/* For Like/Love count */}
                    <div className="postBottomLeft flex items-center">
                        <img src={`${PF}like.png`} alt="" onClick={likeHandler} className="w-[20px] h-[20px]" />

                        <img src={`${PF}heart.png`} alt="" onClick={likeHandler} className="w-[20px] h-[20px]" />

                        <span className="likeCount text-[14px]">
                            {like} people like it
                        </span>
                    </div>

                    {/* For Comments */}
                    <div className="postBottomRight flex items-center">
                        <span className="comment text-[14px]">{post?.comment} comments</span>
                        <Comment className='text-gray-600' />

                    </div>
                </div>

            </div>

        </div >
    )
}
