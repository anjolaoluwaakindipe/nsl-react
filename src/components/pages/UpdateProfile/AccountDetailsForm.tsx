import React from "react";
import Progress from "./Progress";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { paths } from "../../../utils/constants/allPaths";
import { BASE_URL } from "../../../services/requests/authSettings";

function AccountDetailsForm() {
    const navigate = useNavigate();

    const [numberOfAccounts, setNumberOfAccounts] = useState(1);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const onSubmitForm = handleSubmit((data) => {
        navigate(paths.USER_DASHBOARD, { replace: true });
    });

    const addAccountInfo = () => {
        if (numberOfAccounts > 2) {
            return;
        }
        setNumberOfAccounts(numberOfAccounts + 1);
    };

    const oneChar = numberOfAccounts > 1 ? "1" : "";

    const preventChar = (e: any) => {};

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
                <div className="md:col-span-6 col-span-12 ">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__accountName"></label>
                        <input
                            type="text"
                            {...register(`accountName1`, {
                                required: false,
                            })}
                            formNoValidate={true}
                            id="UpdateProfile__accountName"
                            className="outline-none pb-4  w-full"
                            placeholder={`Account Name ${oneChar}`}
                        />
                    </div>

                    <p className="text-xs text-red-900 ">
                        {errors.accountName1?.message}
                    </p>
                </div>
                <div className="md:col-span-6 col-span-12 ">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__accountNumber"></label>
                        <input
                            type="text"
                            max={10}
                            {...register(`accountNumber1`, {
                                required: false,
                            })}
                            id="UpdateProfile__accountNumber"
                            className="outline-none pb-4  w-full"
                            placeholder={`Account Number ${oneChar}`}
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>
                <div className="md:col-span-6 col-span-12 ">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__bankName"></label>
                        <input
                            type="text"
                            max={10}
                            {...register(`accountBank1`, {
                                required: false,
                            })}
                            id="UpdateProfile__bankName"
                            className="outline-none pb-4  w-full"
                            placeholder={`Account Bank ${oneChar}`}
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
                            {...register("bvn")}
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>

                {numberOfAccounts > 1 ? (
                    <>
                        <div className="md:col-span-6 col-span-12 ">
                            <div className="border-0 border-b-2 border-underlineColor">
                                <label htmlFor="UpdateProfile__accountName"></label>
                                <input
                                    type="text"
                                    {...register(`accountName2`, {
                                        required: false,
                                    })}
                                    formNoValidate={true}
                                    id="UpdateProfile__accountName"
                                    className="outline-none pb-4  w-full"
                                    placeholder="Account Name 2"
                                />
                            </div>
                            {/* {validationErrors.accountNumber && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountNumber}
                        </p>
                    )} */}
                        </div>
                        <div className="md:col-span-6 col-span-12 ">
                            <div className="border-0 border-b-2 border-underlineColor">
                                <label htmlFor="UpdateProfile__accountNumber"></label>
                                <input
                                    type="text"
                                    max={10}
                                    {...register(`accountNumber2`, {
                                        required: false,
                                    })}
                                    id="UpdateProfile__accountNumber"
                                    className="outline-none pb-4  w-full"
                                    placeholder="Account Number 2"
                                />
                            </div>
                            {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                        </div>
                        <div className="md:col-span-6 col-span-12 ">
                            <div className="border-0 border-b-2 border-underlineColor">
                                <label htmlFor="UpdateProfile__bankName"></label>
                                <input
                                    type="text"
                                    max={10}
                                    {...register(`accountBank2`, {
                                        required: false,
                                    })}
                                    id="UpdateProfile__bankName"
                                    className="outline-none pb-4  w-full"
                                    placeholder="Account Bank 2"
                                />
                            </div>
                            {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                        </div>
                    </>
                ) : (
                    <div className="col-span-12 ">
                        <button
                            className="btn1 bg-primaryColor text-white w-full sm:w-max flex items-center space-x-2"
                            onClick={addAccountInfo}
                        >
                            <AiFillPlusCircle />
                            <span>Add Account Info</span>
                        </button>
                    </div>
                )}

                <div className="col-span-12 flex justify-between">
                    <button
                        className={`btn1 bg-transparent border-2 hover:bg-transparent border-primaryColor text-primaryColor  w-full md:w-48`}
                        onClick={() => navigate(-1)}
                    >
                        Previous
                    </button>

                    <button className={`btn1  w-full md:w-48`} type="submit">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AccountDetailsForm;
