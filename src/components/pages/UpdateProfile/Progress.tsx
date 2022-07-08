import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";

function Progress({ progress }: { progress?: number }) {
    const location = useLocation();

    return (
        <div className="flex items-center text-successColor">
            <>
                {location.pathname.includes("personal-details") ||
                location.pathname.includes("employment-details") ||
                location.pathname.includes("account-details") ? (
                    <div className="relative">
                        {location.pathname.includes("employment-details") ||
                        location.pathname.includes("account-details") ? (
                            <BsCheck2 className="absolute -top-4" />
                        ) : (
                            ""
                        )}
                        <div
                            className={`w-5 h-5 rounded-full bg-successColor ${
                                location.pathname.includes(
                                    paths.UPDATE_PROFILE.PERSONAL_DETAILS
                                )
                                    ? "animate-pulse shadow-sm shadow-successColor"
                                    : ""
                            }`}
                        ></div>
                    </div>
                ) : (
                    <div className="w-5 h-5 border-2 rounded-full border-primaryColor"></div>
                )}
            </>
            <div className="w-8 h-0.5 m-1 bg-successColor"></div>
            <>
                {location.pathname.includes("employment-details") ||
                location.pathname.includes("account-details") ? (
                    <div className="relative">
                        {location.pathname.includes("account-details") ? (
                            <BsCheck2 className="absolute -top-4" />
                        ) : (
                            ""
                        )}
                        <div
                            className={`w-5 h-5 rounded-full bg-successColor ${
                                location.pathname.includes(
                                    paths.UPDATE_PROFILE.EMPLOYMENT_DETAILS
                                )
                                    ? "animate-pulse shadow-sm shadow-successColor"
                                    : ""
                            }`}
                        ></div>
                    </div>
                ) : (
                    <div className="w-5 h-5 border-2 rounded-full border-successColor"></div>
                )}
            </>
            <div className="w-8 h-0.5 m-1 bg-successColor"></div>
            <>
                {location.pathname.includes("account-details") ? (
                    <div>
                        <div
                            className={`w-5 h-5 rounded-full bg-successColor ${
                                location.pathname.includes(
                                    paths.UPDATE_PROFILE.ACCOUNT_DETAILS
                                )
                                    ? "animate-pulse shadow-sm shadow-successColor"
                                    : ""
                            }`}
                        ></div>
                    </div>
                ) : (
                    <div className="w-5 h-5 border-2 rounded-full border-successColor"></div>
                )}
            </>
        </div>
    );
}

export default Progress;
