import React from "react";
import { Outlet } from "react-router-dom";

function HalfNavBarLayout({ children }: { children?: JSX.Element }) {
    return (
        <div className="bg-bgColor md:py-5 min-h-screen ">
            <img
                src="/assets/companylogo2.svg"
                alt="logo"
                className="object-contain w-20 md:w-40 md:px-10 pt-5 pb-10  px-5"
            />

            <div className="bg-contColor max-w-5xl mx-auto py-20 px-10 md:py-20 md:px-20 min-h-screen md:min-h-0">
                {children}
                <Outlet />
            </div>
        </div>
    );
}

export default HalfNavBarLayout;
