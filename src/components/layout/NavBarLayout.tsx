import React from "react";
import { Outlet } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import {  VscBellDot } from "react-icons/vsc";

function NavBarLayout({ children }: { children: React.ReactElement }) {
    return (
        <div>
            <div className="w-full py-5 shadow-md z-10">
                <div className="md:max-w-5xl m-auto w-full px-5 md:px-5 flex items-center justify-between">
                    <div>
                        <img
                            src="assets/companylogo1.svg"
                            alt="logo"
                            className="object-contain "
                        />
                    </div>
                    <div className="flex  space-x-10 justify-end">
                        <div className="flex justify-center items-center bg-gray-300 brightness-125 w-7 h-7  rounded-full">
                            <VscBellDot className="text-2xl text-primaryColor" />
                        </div>
                        <div className="flex justify-center items-center bg-primaryColor w-7 h-7  rounded-full cursor-pointer hover:brightness-75">
                            <CgProfile className="text-2xl text-white" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full ">
                {children}
                <Outlet />
            </div>
        </div>
    );
}

export default NavBarLayout;
