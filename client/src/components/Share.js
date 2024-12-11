import React, { useContext, useRef, useState } from 'react'
import { PermMedia, Label, LocationOn, Mood, Cancel } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


export default function Share() {
    // Loading the public path
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // Fetching the current User
    const { user } = useContext(AuthContext);

    // Getting Share Post Details
    const desc = useRef();

    // Getting file
    const [file, setFile] = useState(null);

    // Function to handle post share
    const submitHandler = async (e) => {
        e.preventDefault();
        // Creating new post
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };

        // Uploading the file data
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);

            try {
                await axios.post("/upload", data); //Changed Added /api

                // await axios.post("/api/upload", data, {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     }
                // }); //Changed Added /api

            } catch (err) {
                console.log(err);
            }
        }

        // Posting to the server through API as a new Post
        try {
            await axios.post("/posts", newPost);
            // Reloading/Refreshing the page after uploading a post(We can also use Context API for this)
            window.location.reload();
        } catch (err) {
            // console.log("Please Upload");
            console.log(err);
        }
    };

    return (
        <div className='shareWrapper m-2 px-4 py-6 custom-box-shadow'>

            {/* Top Part (Profile Pic, Write Post) */}
            <div className="shareTop flex gap-1 items-center text-wrap">
                <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profilePic w-[60px] max-w-{20%} h-[60px] rounded-full object-cover" />

                <textarea
                    placeholder={`What is in your Mind ${user.username}?`}
                    ref={desc}
                    className="shareInput p-2 w-[80%] focus:outline-none text-wrap resize-none overflow-hidden bg-gray-100"
                />

            </div>

            <hr className="shareHr my-4" />

            {/* DIV container for File Preview */}
            {file && (
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />

                    <Cancel onClick={() => setFile(null)} className="shareCancelImg" />
                </div>
            )}

            {/* Bottom Part (Share Option, Media Picker) */}
            <form onSubmit={submitHandler} className="shareBottom flex flex-col gap-2 justify-center items-center">
                <div className="shareOptions p-1 flex justify-center items-center gap-2 text-sm">

                    <label htmlFor='file' className="shareOption flex items-center gap-1 flex-wrap cursor-pointer justify-center m-1">
                        <PermMedia className='text-gray-600' />
                        <span className="text-black">Photo or Video</span>
                        <input style={{ display: "none" }} type="file" id='file' accept='.png, .jpg, .jpeg, ' onChange={(e) => setFile(e.target.files[0])} />
                    </label>

                    <div className="shareOptions flex items-center gap-1 flex-wrap cursor-pointer justify-center m-1">
                        <Label className='text-green-500' />
                        <span className="text-black">Tag</span>
                    </div>

                    <div className="shareOptions flex items-center gap-1 flex-wrap cursor-pointer justify-center m-1">
                        <LocationOn className='text-red-500' />
                        <span className="text-black">Location</span>
                    </div>

                    <div className="shareOptions flex items-center gap-1 flex-wrap cursor-pointer justify-center m-1">
                        <Mood className='text-yellow-500' />
                        <span className="text-black">Feelings</span>
                    </div>
                </div>


                <button type='submit' className="sharePost bg-green-500 hover:bg-green-600 text-white p-1 w-full">
                    Share
                </button>

            </form>

        </div>
    )
}
