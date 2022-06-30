import React from "react";

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

import { useNavigate } from "react-router-dom";
import { useModal } from "../../../services/customHooks/useModal";
import { paths } from "../../../utils/constants/allPaths";
import CurrencyInputField from "../../shared/Inputs/TextFields/CurrencyInputField";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import WebCamInput from "../../shared/Inputs/WebCamInput";
import { Controller } from "react-hook-form";
import { render } from "@testing-library/react";

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
    const watchTermsAndCond = watch("termsAndCondition");

    const tenorDropdownOptions = [
        { value: "14 days", label: "20 days" },
        { value: "30 days", label: "30 days" },
        { value: "60 days", label: "60 days" },
        { value: "90 days", label: "90 days" },
        { value: "180 days", label: "180 days" },
    ];

    const onProceed = () => {
        navigate(paths.LOGIN, { replace: true });
    };

    const { openModalFunc } = useModal("LoanApplicationSucessModal", false);

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        openModalFunc();
    });
    console.log(errors);

    const navigate = useNavigate();

    return (
        <div>
            <div className="pt-5 space-y-5 shadow-red-600 ">
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
                {/*amount*/}
                <CurrencyInputField
                    register={register("amount")}
                    id={"loanApplicatonAmount"}
                    placeholder="Amount"
                    errorMessage={errors?.amount?.message}
                />

                {/*tenor*/}
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
                {/*interest (should be fixed )*/}
                <div>
                    <FloatingPlaceholderTextField
                        register={register("interest")}
                        type="text"
                        placeholder="Interest"
                        errorMessage={errors?.interest?.message}
                    />
                </div>
                {/*purpose*/}
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

                <div>
                    <Controller
                        name="picture"
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <WebCamInput
                                    value={value}
                                    onChange={onChange}
                                    errorMessage={errors?.picture?.message}
                                />
                            );
                        }}
                    />
                </div>

                {/*terms tick box*/}
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
        </div>
    );
}

export default Form1;
