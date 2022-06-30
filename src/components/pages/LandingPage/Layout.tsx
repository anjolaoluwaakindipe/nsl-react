import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { VscBellDot } from "react-icons/vsc";
import { paths } from "../../../utils/constants/allPaths";
import { useModal } from "../../../services/customHooks/useModal";
import { authSelector } from "../../../state/authSlice";
import { useSelector } from "react-redux";

function Layout({ children }: { children?: React.ReactElement }) {
    const navigate = useNavigate();
    const { user } = useSelector(authSelector)



    return (
        <div className=" w-full ">
            <div className="w-full md:max-w-7xl py-5 shadow-xl z-10 bg-bgColor">
                <div className=" md:max-w-7xl m-auto w-full px-5 md:px-5 flex items-center justify-between ">
                    <div>
                        <img
                            src="/assets/companylogo2.svg"
                            alt="logo"
                            className="object-contain w-10 md:w-20 float-left "

                        />
                    </div>

                    <div className="flex space-x-5  md:space-x-10 justify-end items-center">


                        {/*login*/}
                        <div>
                            <button className="flex justify-center items-center  w-20 h-7 md:w-25 md:h-10 text-sm bg-primaryColor rounded-lg text-contColor cursor-pointer hover:brightness-75"
                                onClick={() => {
                                    navigate(paths.LOGIN)

                                }}
                            >
                                Login
                            </button>
                        </div>


                        <div>
                            <button className="flex justify-center items-center  w-20 h-7 md:w-25 md:h-10 text-sm bg-contColor rounded-lg text-primaryColor border-primaryColor cursor-pointer hover:brightness-75"
                                onClick={() => {
                                    navigate(paths.CREATE_ACCOUNT)

                                }}
                            >
                                Sign Up
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-full  bg-lightPink">
                {children}
                <Outlet />

                <div className="text-accentColor items-center p-10  justify-center flex center">

                    copyright @nsl 2022
                </div>
            </div>

        </div>
    );
}

export default Layout;
