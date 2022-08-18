import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { VscBellDot } from "react-icons/vsc";
import { paths } from "../../utils/constants/allPaths";
import { useModal } from "../../services/customHooks/useModal";
import { authSelector } from "../../state/authSlice";
import { useSelector } from "react-redux";

function NavBarLayout({ children }: { children?: React.ReactElement }) {
    const navigate = useNavigate();
    const { user } = useSelector(authSelector);

    const { openModalFunc } = useModal("LogOutModal", false);

    return (
        <div>
            <div className="w-full py-5 shadow-2xl z-10 bg-bgColor">
                <div className=" md:max-w-5xl m-auto w-full px-5 md:px-5 flex items-center justify-between">
                    <div>
                        <img
                            src="/assets/companylogo2.svg"
                            alt="logo"
                            className="object-contain w-10 md:w-auto cursor-pointer hover:scale-105 "
                            onClick={() => {
                                if (user?.rfStatus === "Draft") {
                                    navigate(paths.WELCOME);
                                } else if (user?.rfStatus === "New") {
                                    navigate(paths.WAITING);
                                } else if (user?.rfStatus === "Processed") {
                                    navigate(paths.USER_DASHBOARD);
                                } else {
                                    navigate(paths.LANDINGPAGE);
                                }
                            }}
                        />
                    </div>

                    <div className="flex space-x-5  md:space-x-10 justify-end items-center">
                        {/* notification */}
                        <div className="w-6 h-6 md:w-10 md:h-10 flex justify-center items-center bg-red-100 hover:brightness-75   rounded-full cursor-pointer">
                            <VscBellDot className="md:text-2xl text-primaryColor" />
                        </div>

                        {/*logout*/}
                        <div>
                            <button
                                className="flex justify-center items-center  w-20 h-7 md:w-25 md:h-10 text-sm bg-primaryColor rounded-lg text-contColor cursor-pointer hover:brightness-75"
                                onClick={() => {
                                    openModalFunc();
                                }}
                            >
                                LOG OUT
                            </button>
                        </div>
                        {/*profile*/}
                        {/* <img src="" alt="" /> */}
                        {user?.rfStatus === "Processed" && (
                            <div
                                className="flex justify-center items-center bg-primaryColor w-6 h-6 md:w-10 md:h-10  rounded-full cursor-pointer hover:brightness-75 overflow-hidden"
                                onClick={() => navigate(paths.PROFILE)}
                            >
                                {user?.picture ? (
                                    <img
                                        className="h-full w-full object-cover object-top"
                                        src={
                                            "data:image/png;base64," +
                                            user?.picture
                                        }
                                        alt="profile_picture"
                                        // width={90}
                                    />
                                ) : (
                                    <CgProfile className="text-white text-2xl" />
                                )}
                            </div>
                        )}
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
