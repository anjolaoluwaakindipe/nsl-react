import React from "react";
import Progress from "./Progress";
import { useNavigate } from "react-router-dom";

function AccountDetailsForm() {
    const navigate = useNavigate();

    

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        navigate("/update-profile/account-details");
    };

    return (
        <div>
            <div className="flex justify-between items-center pt-10 pb-5 border-b-2 border-gray-200">
                <h4 className="text-accentColor ">Account Details</h4>
                <Progress />
            </div>

            <form
                className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
                autoComplete="off"
                autoSave="off"
                onSubmit={onSubmitForm}
            >
                <div className=" col-span-12 md:col-span-6 ">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__accountName"></label>
                        <input
                            type="text"
                            formNoValidate={true}
                            id="UpdateProfile__accountName"
                            className="outline-none pb-4  w-full"
                            placeholder="Account Name"
                        />
                    </div>
                    {/* {validationErrors.accountNumber && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountNumber}
                        </p>
                    )} */}
                </div>
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__accountNumber"></label>
                        <input
                            type="text"
                            max={10}
                            id="UpdateProfile__accountNumber"
                            className="outline-none pb-4  w-full"
                            placeholder="AccountNumber"
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__bankName"></label>
                        <input
                            type="text"
                            max={10}
                            id="UpdateProfile__bankName"
                            className="outline-none pb-4  w-full"
                            placeholder="Bank Name"
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>

                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__bvn"></label>
                        <input
                            type="text"
                            id="UpdateProfile__bvn"
                            className="outline-none pb-4  w-full"
                            placeholder="BVN"
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>

                <div className="col-span-12 flex justify-between">
                    <button
                        className={`btn1 bg-transparent border-2 hover:bg-transparent border-primaryColor text-primaryColor  w-full md:w-48`}
                    >
                        Previous
                    </button>

                    <button
                        className={`btn1  w-full md:w-48`}
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AccountDetailsForm;
