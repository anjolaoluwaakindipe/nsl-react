import React from "react";
import Progress from "./Progress";



function PersonalDetailsForm() {
    const onSubmitForm = () => {};

    return (
        <div>
            <div className="flex justify-between items-center pt-10 pb-5 border-b-2 border-gray-200">
                <h4 className="text-accentColor ">Personal Details</h4>
                <Progress />
            </div>

            <form
                action="/"
                className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
                autoComplete="off"
                autoSave="off"
            >
                <div className=" col-span-12 md:col-span-6 ">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="LoanPaymentOption__accountNumber"></label>
                        <input
                            type="text"
                            name="accountNumber"
                            maxLength={10}
                            pattern={"[0-9]*"}
                            formNoValidate={true}
                            id="LoanPaymentOption__accountNumber"
                            className="outline-none pb-4  w-full"
                            placeholder="Account Number"
                            
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
                        <label htmlFor="LoanPaymentOption__accountBank"></label>
                        <input
                            type="text"
                            name="accountBank"
                            max={10}
                            id="LoanPaymentOption__accountBank"
                            className="outline-none pb-4  w-full"
                            placeholder="Account Bank"
                       
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>
                <div className=" col-span-12  ">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="LoanPaymentOption__accountName"></label>
                        <input
                            type="text"
                            name="accountName"
                            max={10}
                            formNoValidate={true}
                            id="LoanPaymentOption__accountName"
                            className="outline-none pb-4  w-full"
                            placeholder="Account Name"
                            // value={formFields.accountName}
                            // onChange={handleFormChanges}
                        />
                    </div>
                    {/* {validationErrors.accountName && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountName}
                        </p>
                    )} */}
                </div>

                <button
                    className={`col-span-12 md:col-span-6 btn1 bg-darkTextColor `}
                    type="submit"
                    onClick={onSubmitForm}
                >
                    Proceed
                </button>
            </form>
        </div>
    );
}

export default PersonalDetailsForm;
