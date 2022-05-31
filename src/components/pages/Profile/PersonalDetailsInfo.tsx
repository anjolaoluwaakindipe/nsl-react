import React from "react";
import { AiFillEdit } from "react-icons/ai";

function PersonalDetailsInfo() {
    return (
        <div className="col-span-1 space-y-6">
            <div className="w-full flex justify-between items-end">
                <h1 className="font-semibold">Personal Details</h1>

                <AiFillEdit className="cursor-pointer text-primaryColor brightness-125" />
            </div>

            <div className="grid grid-cols-2 p-6 bg-white text-sm rounded-md gap-y-8 max-w-full">
                <div className="col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold ">
                        Email Address
                    </h1>
                    <p className="break-words">oluwatosinajayi1000@gmail.com</p>
                </div>
                <div className="col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Phone Number
                    </h1>
                    <p className="break-words">08023490079</p>
                </div>
                <div className="col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Marital Status
                    </h1>
                    <p className="break-words">Single</p>
                </div>
                <div className="col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        CSCS Number
                    </h1>
                    <p className="break-words">2314567909</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        NIN Numberr
                    </h1>
                    <p>2314567909</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">BVN </h1>
                    <p>4884782392976</p>
                </div>
                <div className="col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Residential Address
                    </h1>
                    <p className="break-words">
                        3, Alago Street, Eruwen, Ikorodu, Lagos State, Nigeria.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PersonalDetailsInfo;
