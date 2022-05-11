import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function Progress({ progress }: { progress?: number }) {
    const location = useLocation();

    return (
        <div className="flex items-center text-primaryColor">
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
                        <div className="w-5 h-5 rounded-full bg-primaryColor"></div>
                    </div>
                ) : (
                    <div className="w-5 h-5 border-2 rounded-full border-primaryColor"></div>
                )}
            </>
            <div className="w-8 h-0.5 m-1 bg-primaryColor"></div>
            <>
                {location.pathname.includes("employment-details") ||
                location.pathname.includes("account-details") ? (
                    <div>
                        {location.pathname.includes("employment-details") ? (
                            <BsCheck2 className="absolute -top-4" />
                        ) : (
                            ""
                        )}
                        <div className="w-5 h-5 rounded-full bg-primaryColor"></div>
                    </div>
                ) : (
                    <div className="w-5 h-5 border-2 rounded-full border-primaryColor"></div>
                )}
            </>
            <div className="w-8 h-0.5 m-1 bg-primaryColor"></div>
            <>
                {location.pathname.includes("account-details") ? (
                    <div>
                        <img src="" alt="" />
                        <div className="w-5 h-5 rounded-full bg-primaryColor"></div>
                    </div>
                ) : (
                    <div className="w-5 h-5 border-2 rounded-full border-primaryColor"></div>
                )}
            </>
        </div>
    );
}

export default Progress;
