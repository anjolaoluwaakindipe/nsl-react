import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";

import { GrMail } from "react-icons/gr";

function Footer() {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-3 px-10 gap-y-6 md:gap-x-1 pb-5 pt-10 px-5">

            {/* logo */}
            {/* <div>
                <img
                    src="/assets/companylogo2.svg"
                    alt="logo"
                    className="object-contain w-10 md:w-10 float-left "

                />
            </div> */}

            {/* number */}
            <div className="grid-span-1   flex items-center space-x-3">
                <img
                    src="/assets/phone.svg"
                    alt="call_icon"
                    className="object-contain w-5 "

                />
                <div className="text-accentColor">
                    Give us a call
                    <div className="text-black">
                        01-271-5754
                    </div>
                </div>

            </div>

            {/* email */}
            <div className="grid-span-1 flex items-center space-x-3">
                <img
                    src="/assets/mail.svg"
                    className="object-contain w-5 "
                    alt="message_icon"
                />
                <div className="text-accentColor">
                    send us a message
                    <div className="text-black">
                        info@nsl24.com
                    </div>
                </div>

            </div>

            {/* location */}
            <div className="grid-span-1 flex items-center space-x-3">
                <img
                    src="/assets/location.svg"
                    className="object-contain w-5 "
                    alt="location_icon"

                />
                <div className="text-accentColor">
                    Office Location
                    <div className="text-black">
                        6th Floor, Knight Frank Building, 24 Campbell St, Lagos Island 102273, Lagos.
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Footer;