import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";
import { authSelector } from "../../../state/redux/authSlice";
import { useSelector } from "react-redux";

function AccountDetailsSummaryInfo() {
    const navigate = useNavigate();
    const { user } = useSelector(authSelector)
    return (
        <div className="col-span-1 space-y-6">
            <div className="w-full flex justify-between items-end">
                <div className="flex space-x-2">
                    <h1 className="font-semibold">Account Details</h1>
                    <div className="w-6 h-6 rounded-full bg-primaryColor text-white flex justify-center items-center">
                        1
                    </div>
                </div>

                <AiFillEdit
                    className="cursor-pointer text-primaryColor brightness-125"
                    onClick={() => navigate(paths.EDIT_ACCOUNT_DETAILS)}
                />
            </div>

            <div className="grid grid-cols-2 p-6 bg-white text-sm rounded-md gap-y-8 max-w-full">
                <div className="col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold ">
                        Account Name
                    </h1>
                    <p className="break-words">
                        { }
                    </p>
                </div>
                <div className="col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Account Number
                    </h1>
                    <p className="break-words">
                        { }
                    </p>
                </div>
                <div className="col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Bank Name
                    </h1>
                    <p className="break-words">
                        { }
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AccountDetailsSummaryInfo;
