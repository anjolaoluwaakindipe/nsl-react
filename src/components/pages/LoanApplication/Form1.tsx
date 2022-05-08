import React from "react";
import CurrencyInput from "react-currency-input-field";

// Used to Accept react-hook-form values
import {
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister,
} from "react-hook-form";

// types
import { LoanApplicationFormInfo } from "../../../typings";

type LoanApplicationForm1Props = {
    register: UseFormRegister<LoanApplicationFormInfo>;
    errors?: FieldErrors<LoanApplicationFormInfo>;
    handleSubmit: UseFormHandleSubmit<LoanApplicationFormInfo>;
    setNextPage: React.Dispatch<React.SetStateAction<boolean>>
};

function Form1({ register, errors, handleSubmit, setNextPage }: LoanApplicationForm1Props) {
    const onSubmit =() => {
        setNextPage(true)
    }

    return (
        <>
            <div className="pt-5">
                <h4 className="heading-info1 font-light leading-6 text-justify">
                    Based on your portfolio evalution, you are eligible to a
                    maximum loan amount of N 500,000, The principal and interest
                    shall be rolled over at maturity at the prevailing terms and
                    conditions, if the principal and accrued interest are not
                    received at maturity. Rolled over will not be more than
                    once.
                </h4>
                <h4 className="heading-info1 font-light leading-6 text-justify">
                    <span className="font-normal"> Note:</span> The loan will
                    range from 30 days – 90 days
                </h4>
            </div>
            <form
                onSubmit={onSubmit}
                className="w-full py-20 space-y-16  text-darkTextColor"
                autoComplete="off"
                autoSave="off"
                autoCorrect="off"
            >
                <div>
                    <div className=" border-0 border-b-2 border-underlineColor flex  space-x-3 items-end">
                        <h1 className="pb-4 ">N</h1>
                        <label htmlFor="amount"></label>
                        <CurrencyInput
                            {...register("amount")}
                            id="LoanApplication__amount"
                            className="outline-none pb-4  w-full inline-block"
                            placeholder="Amount"
                        />
                    </div>
                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.amount?.message}
                        </p>
                    }
                </div>

                <div>
                    <div className=" border-0 border-b-2  border-underlineColor ">
                        <label htmlFor="tenor"></label>
                        <input
                            type="text"
                            {...register("tenor")}
                            id="LoanApplcation_tenor"
                            className="outline-none pb-4  border-0 "
                            placeholder="Tenor"
                        />
                    </div>
                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.tenor?.message}
                        </p>
                    }
                </div>

                <div>
                    <div className=" border-0 border-b-2  border-underlineColor ">
                        <label htmlFor="interest"></label>
                        <input
                            type="text"
                            {...register("interest")}
                            id="LoanApplication__interest"
                            className="outline-none pb-4 border-0  w-full"
                            placeholder="Interest-15%"
                        />
                    </div>
                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.interest?.message}
                        </p>
                    }
                </div>

                <div>
                    <div className=" border-0 border-b-2  border-underlineColor ">
                        <label htmlFor="narration"></label>
                        <textarea
                            {...register("narration")}
                            id="LoanApplcation_narration"
                            className="outline-none bg-bgColor pb-4  resize-none h-32 p-3 w-full border-0 "
                            placeholder="Narration"
                        ></textarea>
                    </div>
                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.narration?.message}
                        </p>
                    }
                </div>

                <button
                    className={`w-full md:w-1/2 btn1 bg-darkTextColor `}
                    type="submit"
                >
                    Proceed
                </button>
            </form>
        </>
    );
}

export default Form1;
