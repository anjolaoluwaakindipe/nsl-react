import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";

function Form() {
    const [numberOfAccounts, setNumberOfAccounts] = useState(1);
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            accountNumber1: "",
            accountNumber2: "",
            accountName1: "",
            accountName2: "",
            accountBank1: "",
            accountBank2: "",
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    const addAccountInfo = () => {
        if (numberOfAccounts > 2) {
            return;
        }
        setNumberOfAccounts(numberOfAccounts + 1);
    };

    const oneChar = numberOfAccounts > 1 ? "1" : "";
    return (
        <div>
            <form
                className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
                autoComplete="off"
                autoSave="off"
                onSubmit={onSubmit}
            >
                {/* account name*/}
                <div className=" col-span-12 ">
                    <FloatingPlaceholderTextField
                        placeholder={`Account Name ${oneChar}`}
                        type="text"
                        register={register("accountName1")}
                        registerName="Account Name"
                        id="EditProfile__accountName"
                        //errorMessage={validationErrors.accountName1.message}
                    />
                </div>

                {/* account number*/}
                <div className="md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder={`Account Number ${oneChar}`}
                        type="text"
                        register={register("accountNumber1")}
                        registerName="account Number"
                        id="EditProfile__accountNumber"
                        // errorMessage={errors.accountNumber1?.message}
                    />
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>

                {/* account bank*/}
                <div className=" col-span-12  ">
                    <FloatingPlaceholderTextField
                        placeholder={`Account Bank ${oneChar}`}
                        type="text"
                        register={register("accountBank1")}
                        registerName="Account Name"
                        id="EditProfile__bankName"
                        // errorMessage={errors.accountBank1?.message}
                    />
                </div>

                {numberOfAccounts > 1 ? (
                    <>
                        <div className=" col-span-12 ">
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

                        {/* account number*/}
                        <div className="col-span-12">
                            <FloatingPlaceholderTextField
                                placeholder={`Account Number ${oneChar}`}
                                type="text"
                                register={register("accountNumber1")}
                                registerName="account Number"
                                id="UpdateProfile__accountNumber"
                                //   errorMessage={errors.accountNumber1?.message}
                            />
                            {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                        </div>
                        {/* account bank*/}
                        <div className=" col-span-12 ">
                            <FloatingPlaceholderTextField
                                placeholder={`Account Bank ${oneChar}`}
                                type="text"
                                register={register("accountBank1")}
                                registerName="Account Name"
                                id="UpdateProfile__bankName"
                                //   errorMessage={errors.accountBank1?.message}
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

                <div className="col-span-12 flex justify-end">
                    <button
                        className={`btn1  w-full md:w-48`}
                        type="submit"
                        disabled={!formState.isDirty}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
