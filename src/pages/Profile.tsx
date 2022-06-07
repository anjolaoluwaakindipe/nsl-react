import React from "react";
import NavBarLayout from "../components/layout/NavBarLayout";

import {
    AccountDetailsInfo,
    EmploymentDetailsInfo,
    ProfileHeader,
    UploadInfo,
} from "../components/pages/Profile";
import PersonalDetailsInfo from "../components/pages/Profile/PersonalDetailsInfo";

function Profile() {
    return (
        <NavBarLayout>
            <div className="bg-bgColor2 w-full min-h-screen py-10">
                <div className="md:max-w-6xl bg-white rounded-tl-3xl pb-10 mx-5  lg:mx-auto   max-w-none flex flex-col">
                    {/* Header */}
                    <ProfileHeader />

                    {/* Body */}
                    <div className="w-full mt-48 grid grid-cols-1 grid-flow-row-dense px-5  md:px-16 gap-10">
                        <PersonalDetailsInfo />
                        <EmploymentDetailsInfo />
                        <AccountDetailsInfo />
                        <UploadInfo />
                    </div>
                </div>
            </div>
        </NavBarLayout>
    );
}

export default Profile;
