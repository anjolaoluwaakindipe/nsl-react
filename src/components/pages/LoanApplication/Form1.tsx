// Used to Accept react-hook-form values
import { BsCheck2 } from "react-icons/bs";

// types
import { LoanApplicationFormInfo } from "../../../typings";
import CardInput from "./CardInput";

import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../services/customHooks/useModal";
import { loanApplicationFormSchema } from "../../../utils/validation/loanApplication";
import CurrencyInputField from "../../shared/Inputs/TextFields/CurrencyInputField";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import WebCamInput from "../../shared/Inputs/WebCamInput";
import { useEffect, useRef } from "react";
import { loanRequests } from "../../../services/requests/loanRequests";
import toast from "react-hot-toast";
import formatMoney from "../../../utils/moneyFormatter";
import { useSelector } from 'react-redux';
import { authSelector } from '../../../state/authSlice';

function Form1() {
    const {customerNo, firstName, lastName, middleName, phoneNumber, email} = useSelector(authSelector).user!

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
        control,
    } = useForm<LoanApplicationFormInfo>({
        defaultValues: {
            amount: "",
            interest: "",
            purpose: "",
            tenor: { value: "", label: "" },
        },
        resolver: joiResolver(loanApplicationFormSchema),
    });

    // watches
    const watchTermsAndCond = watch("termsAndCondition");
    const watchAmount = watch("amount");
    const watchTenor = watch("tenor");

    const loanInfoToastId = "loanInfoToastId";

    const tenorDropdownOptions = [
        { value: "30", label: "30 days" },
        { value: "60", label: "60 days" },
        { value: "90", label: "90 days" },
        { value: "180", label: "180 days" },
    ];

    console.log(errors)

    const { openModalFunc } = useModal("LoanApplicationSucessModal", false);

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        const submissionResponse = await loanRequests.submitLoanApplication({
            customerNo: customerNo!,
            amountNeeded: data.amount.replaceAll(",", ""),
            channel: "web",
            email: email!,
            name: `${lastName} ${firstName} ${middleName}`,
            phoneNumber: phoneNumber!,
            rate: data.interest,
            repaymentAmount: data.repaymentAmount.replaceAll(",","").replaceAll("N", "").trim(),
            repaymentDate: data.repaymentDate,
            tenor: data.tenor.value + " days"

        });

        if (submissionResponse.status === 200) {
            toast.success(submissionResponse.data.responseMessage, {
                position: "top-right",
            });
            openModalFunc();
        } else {
            toast.error(
                "Something went wrong while trying to submit your loan. Please try again later."
            );
        }
    });

    const getOtherLoanInformation = async () => {
        const response = await loanRequests.getLoanTenureRepaymentAndDate({
            amount: parseFloat(watchAmount.replace(",", "")),
            tenor: parseInt(watchTenor.value),
        });
        console.log(response);

        if (response.status === 200) {
            setValue(
                "repaymentAmount",
                `N     ${formatMoney(response.data.repaymentAmount)}`
            );
            setValue("interest", `${response.data.rate}%`);
            setValue(
                "repaymentDate",
                new Date(response.data.repaymentDueDate).toDateString()
            );
            toast.success("Please check your Interest and loan Info!!!", {
                id: loanInfoToastId,
            });
        } else {
            toast.error(
                "An error occured while calculating your interest and repayment info. Please try again later.",
                { id: loanInfoToastId }
            );
        }
    };
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    useEffect(() => {
        if (!watchAmount || !watchTenor.value) return;
        clearTimeout(timerRef.current!);
        console.log("start");
        toast.loading("loading interest and repayment info...", {
            id: loanInfoToastId,
        });
        timerRef.current = setTimeout(async () => {
            await getOtherLoanInformation();
        }, 1000);
    }, [watchAmount, watchTenor]);

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
                <div className=" col-span-12 md:col-span-6 ">
                    <Controller
                        control={control}
                        name="amount"
                        render={({ field: { onChange, value } }) => (
                            <CurrencyInputField
                                placeholder="Gross Income"
                                value={value}
                                onChange={onChange}
                                id="UpdateProfile__grossIncome"
                                errorMessage={errors.amount?.message}
                            />
                        )}
                    />
                </div>

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
                        readOnly={true}
                        errorMessage={errors?.interest?.message}
                    />
                </div>
                {/*interest (should be fixed )*/}
                <div>
                    <FloatingPlaceholderTextField
                        register={register("repaymentAmount")}
                        type="text"
                        placeholder="Repayment Amount"
                        readOnly={true}
                        errorMessage={errors?.interest?.message}
                    />
                </div>
                {/*interest (should be fixed )*/}
                <div>
                    <FloatingPlaceholderTextField
                        register={register("repaymentDate")}
                        type="text"
                        placeholder="Repayment Date"
                        readOnly={true}
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
