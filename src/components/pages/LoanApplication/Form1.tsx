import React from "react";
import CurrencyInput from "react-currency-input-field";
import Dropdown from "react-dropdown";

// Used to Accept react-hook-form values
import {
    Control,
    ControllerProps,
    FieldErrors,
    FieldValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormWatch,
} from "react-hook-form";
import { BsCheck2 } from "react-icons/bs";

// types
import { LoanApplicationFormInfo } from "../../../typings";
import CardInput from "./CardInput";

type LoanApplicationForm1Props = {
    register: UseFormRegister<LoanApplicationFormInfo>;
    errors?: FieldErrors<LoanApplicationFormInfo>;
    handleSubmit: UseFormHandleSubmit<LoanApplicationFormInfo>;
    setNextPage?: React.Dispatch<React.SetStateAction<boolean>>;
    control: Control<LoanApplicationFormInfo, any>;
    watch: UseFormWatch<LoanApplicationFormInfo>;

    Controller: <
        TFieldValues extends FieldValues = FieldValues,
        TName extends import("react-hook-form/dist/types").Path<TFieldValues> = import("react-hook-form/dist/types").Path<TFieldValues>
    >(
        props: ControllerProps<TFieldValues, TName>
    ) => import("react").ReactElement<
        any,
        string | import("react").JSXElementConstructor<any>
    >;
};

function Form1({
    register,
    errors,
    handleSubmit,
    setNextPage,
    Controller,
    watch,
    control,
}: LoanApplicationForm1Props) {
    const onSubmit = handleSubmit((data) => {});

    const watchTermsAndCond = watch("termsAndCondition");

    const tenorDropdownOptions = [
        { value: "14 days", label: "20 days" },
        { value: "30 days", label: "30 days" },
        { value: "60 days", label: "60 days" },
        { value: "90 days", label: "90 days" },
        { value: "180 days", label: "180 days" },
    ];

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
                        <p className="text-xs text-red-900  ">
                            {errors?.amount?.message}
                        </p>
                    }
                </div>

                <div>
                    <div className="  ">
                        <Controller
                            name="tenor"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <CardInput
                                    onChange={onChange}
                                    value={value}
                                    options={tenorDropdownOptions}
                                    label="Tenor"
                                />
                            )}
                        />

                        <label htmlFor="tenor"></label>
                    </div>

                    {
                        <p className="text-xs text-red-900 mt-1">
                            {errors?.tenor?.value?.message}
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
                        <label htmlFor="purpose"></label>
                        <textarea
                            {...register("purpose")}
                            id="LoanApplcation_narration"
                            className="outline-none bg-bgColor pb-4  resize-none h-32 p-3 w-full border-0 "
                            placeholder="Purpose"
                        ></textarea>
                    </div>
                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.purpose?.message}
                        </p>
                    }
                </div>

                <div className="flex items-center space-x-3">
                    <label htmlFor="LoanApplication__termsAndCondition">
                        <div
                            className={` border-2 rounded-sm border-primaryColor w-5 h-5 items-center justify-center`}
                        >
                            {watchTermsAndCond ? (
                                <BsCheck2 strokeWidth={0.7} />
                            ) : (
                                ""
                            )}
                        </div>
                    </label>
                    <span>I agree to the Terms and Conditions</span>
                    <input
                        type="checkbox"
                        id="LoanApplication__termsAndCondition"
                        className="hidden"
                        {...register("termsAndCondition")}
                    />
                </div>

                <button className={`w-full md:w-1/2 btn1 `} type="submit">
                    Proceed
                </button>
            </form>
        </>
    );
}

export default Form1;
