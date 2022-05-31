import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

function Form() {
    const [numberOfAccounts, setNumberOfAccounts] = useState(1);
    const { register, handleSubmit, formState } = useForm();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    const addAccountInfo = ()=>{
        if(numberOfAccounts>2){
            return
        }
        setNumberOfAccounts(numberOfAccounts + 1)
    }

    const oneChar = numberOfAccounts > 1 ? "1" : "";
    return (
        <div>
            <form
                className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
                autoComplete="off"
                autoSave="off"
                onSubmit={onSubmit}
            >
                <div className=" col-span-12 ">
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
                    {/* {validationErrors.accountNumber && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountNumber}
                        </p>
                    )} */}
                </div>
                <div className=" col-span-12 ">
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
                <div className=" col-span-12 ">
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
                        <div className=" col-span-12 ">
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
                        <div className=" col-span-12 ">
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

                <div className="col-span-12 flex justify-end">
                    <button className={`btn1  w-full md:w-48`} type="submit" disabled={!formState.isDirty}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
