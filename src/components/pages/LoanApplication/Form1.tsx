import React, { useRef } from "react";
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
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

// types
import { LoanApplicationFormInfo } from "../../../typings";

type LoanApplicationForm1Props = {
    register: UseFormRegister<LoanApplicationFormInfo>;
    errors?: FieldErrors<LoanApplicationFormInfo>;
    handleSubmit: UseFormHandleSubmit<LoanApplicationFormInfo>;
    setNextPage: React.Dispatch<React.SetStateAction<boolean>>;
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
    const onSubmit = () => {
        setNextPage(true);
    };

    const watchTenor = watch("tenor");

    const tenorDropdownOptions = [
        { value: "20 days", label: "20 days" },
        { value: "30 days", label: "30 days" },
        { value: "Two Months", label: "Two Months" },
        { value: "Three Months", label: "Three Months" },
        { value: "Four Months", label: "Four Months" },
        { value: "Five Months", label: "Five Months" },
        { value: "Six Months", label: "Six Months" },
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
                    <div className=" border-0 border-b-2  border-underlineColor   ">
                        <Controller
                            name="tenor"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    options={tenorDropdownOptions}
                                    onChange={onChange}
                                    arrowClosed={<IoMdArrowDropdown />}
                                    arrowOpen={<IoMdArrowDropup />}
                                    value={value}
                                    placeholder="Tenor"
                                    className="relative"
                                    placeholderClassName={
                                        watchTenor
                                            ? "text-black"
                                            : "text-gray-400"
                                    }
                                    controlClassName="appearance-none text-gray-400 outline-none border-0 pb-4  m-0 cursor-pointer flex justify-between items-end"
                                    menuClassName="absolute  left-0 top-16 w-full bg-gray-100 h-36 rounded-md scrollbar scrollbar-visible space-y-2 overflow-y-scroll p-3"
                                />
                            )}
                        />

                        <label htmlFor="tenor"></label>
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
