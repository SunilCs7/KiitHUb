import React from 'react';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';

export default function Homepage() {
    return (
        <div className="home">
            <NavBar />

            {/* Main Container */}
            <div className="homeContainer rounded-none grid grid-cols-12 gap-4 w-full h-full">

                <div className="col-span-2">
                    <Sidebar />
                </div>

                <div className="col-span-7">
                    <Feed />
                </div>

                <div className="col-span-3">
                    <Rightbar />
                </div>
            </div>
        </div>
    );
}
