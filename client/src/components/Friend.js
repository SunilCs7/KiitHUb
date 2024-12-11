import React from "react";

export default function Friend({ user }) {

    // Loading the Public Folder Path
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div>
            <li className="flex gap-3 items-center">
                <img src={user?.profilePicture ? PF + user?.profilePicture : PF + "/person/noAvatar.png"} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                <span className="friendName">{user?.username}</span>
            </li>
        </div>
    )
}
