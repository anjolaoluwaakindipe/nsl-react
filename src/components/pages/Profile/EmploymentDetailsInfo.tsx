import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { paths } from '../../../utils/constants/allPaths';

function EmploymentDetailsInfo() {
    const navigate = useNavigate();
    
    return (
        <div className="col-span-1 space-y-6">
            <div className="w-full flex justify-between items-end">
                <h1 className="font-semibold">Employment Details</h1>

                <AiFillEdit
                    className="cursor-pointer text-primaryColor brightness-125"
                    onClick={() => {
                        navigate(paths.EDIT_EMPLOYMENT_DETAILS);
                    }}
                />
            </div>

            <div className="grid grid-cols-2 p-6 bg-white text-sm rounded-md gap-y-8 gap-x-4">
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">Title</h1>
                    <p>Director</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">Company</h1>
                    <p>ISSL</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Work Sector
                    </h1>
                    <p>Technology</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Company Phone Number
                    </h1>
                    <p>09038578429</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Company Email Address
                    </h1>
                    <p>hey@gmail.com</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Salary Range
                    </h1>
                    <p>$890</p>
                </div>
            </div>
        </div>
    );
}

export default EmploymentDetailsInfo;
