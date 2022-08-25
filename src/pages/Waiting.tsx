import React from 'react'
import HalfNavBarLayout from '../components/layout/HalfNavBarLayout';
import { useSelector } from 'react-redux';
import { authSelector } from '../state/redux/authSlice';
import { capitalize } from '../utils/stringFormatting';

function Waiting() {
    // redux state variables
    const { user } = useSelector(authSelector);

    return (
        <HalfNavBarLayout>
            <div className="flex flex-col justify-center items-center space-y-10 ">
                {/* Welcome image */}
                <img src="/assets/welcomelogo.svg" alt="welcome_img" />

                {/* Welcome page header */}
                <h1 className="heading1">
                    Welcome {capitalize(user?.firstName || "")}
                </h1>

                {/* Welcome page info */}
                <p className="text-center max-w-2xl font-light text-xl">
                    Please patiently wait for your profile to be reviewed. An
                    email will be sent after your profile has been verified
                    before you can proceed.
                </p>
            </div>
        </HalfNavBarLayout>
    );
}

export default Waiting