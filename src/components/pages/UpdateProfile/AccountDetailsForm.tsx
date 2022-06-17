import React from "react";
import Progress from "./Progress";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { paths } from "../../../utils/constants/allPaths";
import { BASE_URL } from "../../../services/requests/authSettings";
import { useModal } from '../../../services/customHooks/useModal';
import FloatingPlaceholderTextField from "../../shared/TextFields/FloatingPlaceholderTextField";

function AccountDetailsForm() {
    const navigate = useNavigate();

    const [numberOfAccounts, setNumberOfAccounts] = useState(1);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const { openModalFunc } = useModal("ProfileUpdateSuccessfulModal", false)

    const onSubmitForm = handleSubmit((data) => {
        openModalFunc();
    });

    const addAccountInfo = () => {
        if (numberOfAccounts > 2) {
            return;
        }
        setNumberOfAccounts(numberOfAccounts + 1);
    };

    const oneChar = numberOfAccounts > 1 ? "1" : "";

    const preventChar = (e: any) => { };

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

                {/* account name*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder={`Account Name ${oneChar}`}
                        type="text"
                        register={register("accountName1")}
                        registerName='Account Name'
                        id="UpdateProfile__accountName"
                        errorMessage={errors.accountName1?.message}
                    />
                </div>

                {/* account number*/}
                <div className="md:col-span-6 col-span-12 ">
                    <FloatingPlaceholderTextField
                        placeholder={`Account Number ${oneChar}`}
                        type="text"
                        register={register("accountNumber1")}
                        registerName='account Number'
                        id="UpdateProfile__accountNumber"
                        errorMessage={errors.accountNumber1?.message}



                    />
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}

                </div>



                {/* account bank*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder={`Account Bank ${oneChar}`}
                        type="text"
                        register={register("accountBank1")}
                        registerName='Account Name'
                        id="UpdateProfile__bankName"
                        errorMessage={errors.accountBank1?.message}
                    />
                </div>



                {/* bvn*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="BVN"
                        type="text"
                        register={register("bvn")}

                        id="UpdateProfile__BVN"
                        errorMessage={errors.BVN?.message}
                    />
                </div>

                {numberOfAccounts > 1 ? (
                    <>


                        {/* account name*/}
                        <div className=" col-span-12 md:col-span-6 ">
                            <FloatingPlaceholderTextField
                                placeholder="Account Name 2"
                                type="text"
                                register={register("accountName2")}
                                registerName='Account Name'
                                id="UpdateProfile__accountName"
                                errorMessage={errors.accountName2?.message}
                            />
                        </div>




                        {/* account number*/}
                        <div className="md:col-span-6 col-span-12 ">
                            <FloatingPlaceholderTextField
                                placeholder="Account Number 2"
                                type="text"
                                register={register("accountNumber2")}
                                registerName='account Number'
                                id="UpdateProfile__accountNumber"
                                errorMessage={errors.accountNumber2?.message}



                            />
                            {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}

                        </div>




                        {/* account bank*/}
                        <div className=" col-span-12 md:col-span-6 ">
                            <FloatingPlaceholderTextField
                                placeholder="Account Bank 2"
                                type="text"
                                register={register("accountBank2")}

                                id="UpdateProfile__bankName"
                                errorMessage={errors.accountBank2?.message}
                            />
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
