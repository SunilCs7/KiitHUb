import React from "react";

export default function Online({ user }) {

    // Loading the Public Path
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div>
            <li className="flex gap-2 my-4">
                <div className="onlineFriend flex gap-2 items-center relative">
                    <img src={PF + user.profilePic} alt="" className="w-[30px] h-[30px] object-cover rounded-full" />

                    <span className="onlineGreenTag absolute bg-green-500 w-[10px] h-[10px] rounded-full top-[-4px] right-0 border-[1.5px] border-white">
                    </span>
                </div>

                <span className="onlineFriendName w-[12px] h-[12px]">{user.username}</span>
            </li>
        </div>
    )
}
