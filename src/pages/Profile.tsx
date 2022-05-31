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
                <div className="md:max-w-6xl md:mx-auto w-full px-5 max-w-none flex flex-col">
                    {/* Header */}
                    <ProfileHeader />

                    {/* Body */}
                    <div className="w-full mt-48 grid grid-cols-1 grid-flow-row-dense md:grid-cols-2 md:px-10 gap-10">
                        <div className="col-span-1 space-y-10">
                            <PersonalDetailsInfo />
                            <UploadInfo />
                        </div>

                        <div className="col-span-1 space-y-10">
                            <EmploymentDetailsInfo />

                            <AccountDetailsInfo />
                        </div>
                    </div>
                </div>
            </div>
        </NavBarLayout>
    );
}

export default Profile;
