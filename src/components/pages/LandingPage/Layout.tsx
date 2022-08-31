import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { VscBellDot } from "react-icons/vsc";
import { paths } from "../../../utils/constants/allPaths";
import { useModal } from "../../../services/customHooks/useModal";
import { authSelector } from "../../../state/redux/authSlice";
import { useSelector } from "react-redux";

function Layout({ children }: { children?: React.ReactElement }) {
    const navigate = useNavigate();
    const { user } = useSelector(authSelector)



    return (
        <div className=" w-full ">
            <div className="w-full py-5 shadow-xl z-10 bg-bgColor4 overscroll-x-contain">
                <div className=" md:max-w-7xl m-auto w-full px-5 md:px-10 flex items-center justify-between ">
                    <div>
                        <img
                            src="/assets/companylogo2.svg"
                            alt="logo"
                            className="object-contain w-10 md:w-16 float-left "
                        />
                    </div>

                    <div className="flex space-x-5  md:space-x-10 justify-end items-center">
                        {/*login*/}
                        <div>
                            <button
                                className="btn1  text-sm py-3 w-32 border-transparent bg-transparent font-medium"
                                onClick={() => {
                                    navigate(paths.LOGIN);
                                }}
                            >
                                Login
                            </button>
                        </div>

                        <div>
                            <button
                                className="btn1  text-sm py-3 w-32 font-medium "
                                onClick={() => {
                                    navigate(paths.CREATE_ACCOUNT);
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

                <div className="text-accentColor items-center p-10  justify-center flex center bg-peach">
                    copyright @nsl 2022
                </div>
            </div>
        </div>
    );
}

export default Layout;
