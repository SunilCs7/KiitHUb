import React, { useContext } from 'react';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'


export default function NavBar() {

    // Choosing the Current User
    const { user } = useContext(AuthContext);

    // Public Folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="navbar grid grid-cols-12 w-full h-16 items-center bg-green-500 gap-3 py-0.5 sticky top-0 rounded-none text-gray-200">

            {/* Logo */}
            <Link to="/">
                <div className="navbarLeft col-span-2 flex justify-center items-center hover:cursor-pointer h-[40px] w-[100px] ml-2">
                    <span className="logo flex flex-row gap-1 items-center justify-center h-full w-full bg-black font-semibold tracking-wider">KIIT <span className='bg-green-500 text-white  px-1.5 py-0 text-lg font-bold'>Hub</span></span>
                </div>
            </Link>

            {/* SearchBar */}
            <div className="searchBar col-span-4 flex items-center gap-4 bg-white p-1 text-black overflow-hidden">
                <Search className="searchIcon" />
                <input
                    placeholder="Search for friend, post or video"
                    className="searchInput px-2 py-1 focus:outline-0"
                />
            </div>

            {/* Links and icons with 7 columns */}
            <div className="navbarRight col-span-6 flex justify-around items-center gap-6">

                <div className="navbarLinks flex items-center gap-3">

                    <Link to="/">
                        <span className="topbarLink cursor-pointer">Homepage</span>
                    </Link>

                    <span className="topbarLink cursor-pointer">Timeline</span>
                </div>

                <div className="navbarIcons flex items-center gap-5 text-white">
                    <div className="accountIcon relative cursor-pointer">
                        <Person />
                        <span className="accountBadge text-[10px] bg-red-600 h-[15px] w-[15px] rounded-full absolute top-[-4px] right-[-4px] flex items-center justify-center">1</span>
                    </div>
                    <div className="chatIcon relative cursor-pointer">
                        <Chat />
                        <span className="chatBadge text-[10px] bg-red-600 h-[15px] w-[15px] rounded-full absolute top-[-4px] right-[-4px] flex items-center justify-center">2</span>
                    </div>
                    <div className="notificationIcon relative cursor-pointer">
                        <Notifications />
                        <span className="notificationBadge text-[10px] bg-red-600 h-[15px] w-[15px] rounded-full absolute top-[-4px] right-[-4px] flex items-center justify-center">1</span>
                    </div>
                </div>

                {/* Profile */}
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="navbarImg w-12 h-12 rounded-full object-cover cursor-pointer" />
                </Link>

            </div>
        </div>
    );
}
