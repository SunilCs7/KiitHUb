import React from 'react';
import { format } from "timeago.js"

export default function Message({ message, own }) {
    return (
        <div className={`flex ${own ? 'justify-end' : 'justify-start'}`}>
            <div className={`message flex flex-col my-1 ${own ? 'items-end' : 'items-start'}`}>
                <div className="messageTop p-1 flex gap-2">
                    <img
                        src="https://images.pexels.com/photos/29084945/pexels-photo-29084945/free-photo-of-smiling-male-portrait-in-studio-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                        className="messageImg w-[30px] h-[30px] rounded-full object-cover"
                    />
                    <p className={`messageText px-2 py-1 rounded-lg text-white ${own ? 'bg-gray-400' : 'bg-green-500'}`}>
                        {message.text}
                    </p>
                </div>

                <div className={`messageBottom text-[12px] ${own ? 'pr-2' : 'pl-2'}`}>
                    {format(message.createdAt)}
                </div>

            </div>


        </div>
    );
}
