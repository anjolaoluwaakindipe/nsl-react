// react redux
import { useSelector } from "react-redux";

// react router
import { useNavigate } from "react-router-dom";

// custom component
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";

// custom selector
import { authSelector } from "../state/authSlice";

// app routes
import { paths } from "../utils/constants/allPaths";
import { capitalize } from "../utils/stringFormatting";

function Welcome() {
    // redux state variables
    const { user } = useSelector(authSelector);
    // react-router variables
    const navigate = useNavigate();

    // custom functions
    const navigateToUpdatePersonalDetails = () => {
        navigate(
            paths.UPDATE_PROFILE.base + paths.UPDATE_PROFILE.PERSONAL_DETAILS
        );
    };
    return (
        <HalfNavBarLayout>
            <div className="flex flex-col justify-center items-center space-y-10 ">
                {/* Welcome image */}
                <img src="/assets/welcomelogo.svg" alt="welcome_img" />

                {/* Welcome page header */}
                <h1 className="heading1">
                    Welcome {capitalize(user?.name?.split(",")[1] || "")}
                </h1>

                {/* Welcome page info */}
                <p className="text-center max-w-2xl font-light text-xl">
                    Let’s get you started with your loan application on our
                    platform. But before you get started, you are required to
                    update your profile first before you can make any loan
                    request.
                </p>

                {/* Welcome page buttom to update profile (starting with the personal details) */}
                <div className="w-full py-10 md:px-10">
                    <button
                        onClick={navigateToUpdatePersonalDetails}
                        className="btn1 w-full md:w-full"
                    >
                        Update profile
                    </button>
                </div>
            </div>
        </HalfNavBarLayout>
    );
}

export default Welcome;
