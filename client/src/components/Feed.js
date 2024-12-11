import React, { useContext, useEffect, useState } from 'react'
import Share from './Share'
import Post from './Post'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

export default function Feed({ username }) {

    // Creating a useState() hook
    const [posts, setPosts] = useState([]);

    // Fetching timelines posts of current user
    const { user } = useContext(AuthContext);

    // Using useEffect() hook to fetch the posts on render of the Feed Component
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username ? await axios.get("/posts/profile/" + username) : await axios.get("/posts/timeline/" + user._id);
            // Sending the post data by sorting according to the time of upload
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        };

        fetchPosts();
    }, [username, user._id]);

    return (
        <div className="feed">
            <div className='feedWrapper text-xl'>

                {/* Logic for showing the Share Post component to only the current user profile */}
                {
                    (!username || username === user.username) && <Share />
                }

                {/* Passing post data (Dummy Data) */}
                {
                    posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))
                }
            </div>
        </div>
    );
}
