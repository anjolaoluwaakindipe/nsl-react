import React from "react";

// customHook
import useForms from "../../../services/customHooks/useForms";

// validation
import { transferFormValidation } from "../../../utils/validation/loanPaymentOption";

function TransferForm() {
    const onSubmitForm = () => {
        setTimeout(() => {
            setSubmitButtonDisabled(false);
        }, 10000);
    };
   

    const {
        formFields,
        handleFormChanges,
        handleFormSubmit,
        validationErrors,
        isSubmitButtonDisabled,
        setSubmitButtonDisabled,
    } = useForms({
        initialValues: {
            accountNumber: "",
            accountBank: "",
            accountName: "",
        },
        validation: transferFormValidation,
        callback: onSubmitForm,
    });


    return (
        <form
            action="/"
            className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            onSubmit={handleFormSubmit}
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
                        value={formFields.accountNumber}
                        onChange={handleFormChanges}
                        onKeyPress={(event)=>{return /[0-9]/i.test(event.key)}}
                    />
                </div>
                {validationErrors.accountNumber && (
                    <p className="text-xs text-red-900 ">
                        {validationErrors.accountNumber}
                    </p>
                )}
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
                        value={formFields.accountBank}
                        onChange={handleFormChanges}
                    
                    />
                </div>
                {validationErrors.accountBank && (
                    <p className="text-xs text-red-900 ">
                        {validationErrors.accountBank}
                    </p>
                )}
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
                        value={formFields.accountName}
                        onChange={handleFormChanges}
                    />
                </div>
                {validationErrors.accountName && (
                    <p className="text-xs text-red-900 ">
                        {validationErrors.accountName}
                    </p>
                )}
            </div>

            <button
                className={`col-span-12 md:col-span-6 btn1 bg-darkTextColor `}
                type="submit"
                disabled={isSubmitButtonDisabled}
            >
                Proceed
            </button>
        </form>
    );
}

export default TransferForm;
