import React from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/authSlice";

function ProfileHeader() {
    const navigate = useNavigate();
    const { user } = useSelector(authSelector);
    return (
        <div className="relative w-full ">
            {/* Back Button */}
            <IoIosArrowDropleftCircle
                size={32}
                className="absolute  md:right-10 md:left-auto left-4 top-4 md:top-20  text-2xl text-primaryColor cursor-pointer"
                onClick={() => navigate(-1)}
            />

            {/* Yellow Banner */}
            <div className="w-full ">
                <img
                    src="assets/profilebanner.svg"
                    alt="banner"
                    className=" object-cover  w-full md:h-48 h-32 rounded-tl-3xl"
                />
            </div>

            {/* Profile name, and status */}
            <div className="flex flex-col md:flex-row absolute md:left-10 w-full md:w-max items-center md:items-end -bottom-36 md:-bottom-24 text-center md:text-left">
                <div className="bg-primaryColor w-28 md:w-44  h-28 md:h-44 rounded-full flex justify-center items-center overflow-hidden">
                    {/* <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-white flex justify-center items-center"></div> */}
                    {user?.picture ? (
                        <img
                        className="h-full w-full"
                            src={"data:image/png;base64," + user?.picture}
                            alt="profile_picture"
                            // width={90}
                        />
                    ) : (
                        <CgProfile className="text-white text-9xl" />
                    )}
                </div>

                <div className="flex flex-col justify-end md:space-y-2 md:px-8 pt-4 md:pt-0">
                    <h1 className="text-sm font-bold text-primaryColor">
                        Profile
                    </h1>
                    <h1 className=" text-base md:text-xl font-light">
                        {user?.firstName?.toUpperCase() +
                            " " +
                            (user?.middleName
                                ? user?.middleName?.toUpperCase() + " "
                                : "") +
                            user?.lastName?.toUpperCase()}
                    </h1>
                    <div className="flex space-x-2 text-xs items-center justify-center md:justify-start">
                        <div className="p-1 text-white bg-successColor rounded-sm">
                            Status
                        </div>
                        <h3>Approved</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
