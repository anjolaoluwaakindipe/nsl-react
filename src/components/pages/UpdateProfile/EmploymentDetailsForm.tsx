import React from "react";
import Progress from "./Progress";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function EmploymentDetailsForm() {
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
    } = useForm();

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        navigate("/update-profile/account-details");
    };

    return (
        <div>
            <div className="flex justify-between items-center pt-10 pb-5 border-b-2 border-gray-200">
                <h4 className="text-accentColor ">Employment Details</h4>
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
                        <label htmlFor="UpdateProfile__title"></label>
                        <input
                            type="text"
                            formNoValidate={true}
                            id="UpdateProfile__title"
                            className="outline-none pb-4  w-full"
                            placeholder="Title"
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
                        <label htmlFor="UpdateProfile__companyName"></label>
                        <input
                            type="text"
                            max={10}
                            id="UpdateProfile__companyName"
                            className="outline-none pb-4  w-full"
                            placeholder="Companys Name"
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
                        <label htmlFor="UpdateProfile__workSector"></label>
                        <input
                            type="text"
                            max={10}
                            id="UpdateProfile__workSector"
                            className="outline-none pb-4  w-full"
                            placeholder="Work Sector"
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
                        <label htmlFor="UpdateProfile__companyPhoneNumber"></label>
                        <input
                            type="text"
                            id="UpdateProfile__companyPhoneNumber"
                            className="outline-none pb-4  w-full"
                            placeholder="Company Phone Number"
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
                        <label htmlFor="UpdateProfile_companyEmailAddress"></label>
                        <input
                            type="text"
                            max={10}
                            id="UpdateProfile__companyEmailAddress"
                            className="outline-none pb-4  w-full"
                            placeholder="Company Email Address"
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
                        <label htmlFor="UpdateProfile__salaryRange"></label>
                        <input
                            type="text"
                            id="UpdateProfile__salaryRange"
                            className="outline-none pb-4  w-full"
                            placeholder="Salary Range"
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>

                <div className="col-span-12">
                    <div className=" border-0 border-b-2  border-underlineColor ">
                        <label htmlFor="UpdateProfile_residentialAddress"></label>
                        <textarea
                            {...register("residentialAddress")}
                            id="UpdateProfile_narration"
                            className="outline-none bg-bgColor pb-4  resize-none h-32 p-3 w-full border-0 "
                            placeholder="Company Residential Address"
                        ></textarea>
                    </div>
                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.narration?.message}
                        </p>
                    }
                </div>

                <div className="col-span-12 flex justify-between">
                    <button
                        className={`btn1 bg-transparent border-2 hover:bg-transparent border-darkTextColor text-darkTextColor  w-full md:w-48`}
                        
                    >
                        Previous
                    </button>

                    <button
                        className={`btn1 bg-darkTextColor  w-full md:w-48`}
                        type="submit"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmploymentDetailsForm;
