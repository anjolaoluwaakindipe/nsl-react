// Used to Accept react-hook-form values
import { BsCheck2 } from "react-icons/bs";

// types
import { LoanApplicationFormInfo } from "../../../typings";
import CardInput from "./CardInput";

import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useModal } from "../../../services/customHooks/useModal";
import { loanRequests } from "../../../services/requests/loanRequests";
import { authSelector } from "../../../state/redux/authSlice";
import formatMoney from "../../../utils/moneyFormatter";
import { loanApplicationFormSchema } from "../../../utils/validation/loanApplication";
import AsyncDropdown from "../../shared/Dropdowns/AsyncDropdown";
import CurrencyInputField from "../../shared/Inputs/TextFields/CurrencyInputField";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import WebCamInput from "../../shared/Inputs/WebCamInput";
import { useCards } from "../../../services/customHooks/useCards";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";
import cardRequest from "../../../services/requests/cardRequest";

function Form1() {
    const { customerNo, firstName, lastName, middleName, phoneNumber, email } =
        useSelector(authSelector).user!;
    const [isButtonLoading, setButtonLoading] = useState(false);
    const navigate = useNavigate();
    const { cardState, cardRequestState } = useCards(customerNo!);

    const [allBanks, setAllBanks] = useState<
        {
            label: string;
            value: {
                disbursementBankCode: string;
                disbursementBankName: string;
            };
        }[]
    >([]);

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
        control,
        setError,
    } = useForm<LoanApplicationFormInfo>({
        defaultValues: {
            amount: "",
            interest: "",
            purpose: "",
            tenor: { value: "", label: "" },
        },
        resolver: joiResolver(loanApplicationFormSchema, {
            abortEarly: false,
        }),

        reValidateMode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });

    // watches
    const watchTermsAndCond = watch("termsAndCondition");
    const watchAmount = watch("amount");
    const watchTenor = watch("tenor");
    const watchAccountNumber = watch("disbursementNUBAN");
    const watchBankInfo = watch("disbursementBankInfo");

    const loanInfoToastId = "loanInfoToastId";
    const accountNameToastId = "accountNameToastId";

    const [portfolioAmount, setPortfolioAmount] = useState<number | null>(0);
    const [loadingPortfolioAmount, setLoadingPortfolioAmount] = useState(true);

    const tenorDropdownOptions = [
        { value: "30", label: "30 days" },
        { value: "60", label: "60 days" },
        { value: "90", label: "90 days" },
        { value: "180", label: "180 days" },
    ];

    const { openModalFunc } = useModal("LoanApplicationSucessModal", false);

    const onSubmit = handleSubmit(async (data) => {
        // const isOkay = loanAmountCheck();

        // if (!isOkay) {
        //     return;
        // }

        setButtonLoading(true);
        const submissionResponse = await loanRequests.submitLoanApplication({
            applicationReference:
                customerNo! +
                "_" +
                new Date()
                    .toISOString()
                    .replaceAll(":", "")
                    .replaceAll(".", "")
                    .replaceAll("-", "")
                    .replaceAll("T", "")
                    .replaceAll("Z", ""),
            customerNo: customerNo!,
            amount: data.amount.replaceAll(",", ""),
            channel: "web",
            emailAddress: email!,
            applicantName: `${lastName} ${firstName} ${middleName}`,
            phoneNumber: phoneNumber!,
            interestRate: data.interest.replaceAll("%", ""),
            repaymentAmount: data.repaymentAmount
                .replaceAll(",", "")
                .replaceAll("N", "")
                .trim(),
            tenor: data.tenor.value,
            purpose: data.purpose,
            disbursementAccountName: data.disbursementAccountName,
            disbursementBankCode:
                data.disbursementBankInfo.disbursementBankCode,
            disbursementNUBAN: data.disbursementNUBAN,
            disbursementBankName:
                data.disbursementBankInfo.disbursementBankName,
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
        setButtonLoading(false);
    });

    // get other loan information
    const getOtherLoanInformation = async () => {
        const response = await loanRequests.getLoanTenureRepaymentAndDate({
            amount: parseFloat(watchAmount.replace(",", "")),
            tenor: parseInt(watchTenor.value),
        });

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

    const loanInfotimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        if (cardState.cardList && cardState.cardList.length === 0) {
            toast.error(
                "You do not have any cards saved to your profile. Please add a card then try again.",
                { position: "top-right" }
            );
            navigate(paths.USER_DASHBOARD, { replace: true });
        }
    }, [cardRequestState.isLoading]);

    // update fields with other loan information
    useEffect(() => {
        if (!watchAmount || !watchTenor.value) return;
        clearTimeout(loanInfotimerRef.current!);

        toast.loading("loading interest and repayment info...", {
            id: loanInfoToastId,
        });
        loanInfotimerRef.current = setTimeout(async () => {
            await getOtherLoanInformation();
        }, 1000);
    }, [watchAmount, watchTenor]); // eslint-disable-line

    const accountNameTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const getAccountName = async () => {
        try {
            console.log(watchBankInfo);
            const accountNameResponse = await loanRequests.getAccountName({
                bankcode: watchBankInfo.disbursementBankCode,
                accountNumber: watchAccountNumber,
            });

            if (accountNameResponse.account_name !== null) {
                toast.success("Account Name discovered", {
                    id: accountNameToastId,
                });
                setValue(
                    "disbursementAccountName",
                    accountNameResponse.account_name
                );
            } else {
                setValue("disbursementAccountName", "");
                toast.error(
                    "Could not get Account Name. Please check your account number!",
                    { id: accountNameToastId }
                );
            }
        } catch (e) {
            setValue("disbursementAccountName", "");
            toast.error(
                "An error occured while getting Account Name. Please try again later",
                { id: accountNameToastId }
            );
        }
    };

    useEffect(() => {
        if (!watchBankInfo || watchAccountNumber.length < 10) {
            setValue("disbursementAccountName", "");
            return;
        }
        const timerId = accountNameTimerRef.current;
        clearTimeout(accountNameTimerRef.current!);

        toast.loading("Getting Account Name...", {
            id: accountNameToastId,
        });
        loanInfotimerRef.current = setTimeout(async () => {
            await getAccountName();
        }, 1000);

        return () => {
            clearTimeout(timerId);
            toast.dismiss();
        };
    }, [watchBankInfo, watchAccountNumber]); // eslint-disable-line

    const loanAmountCheck = () => {
        if (
            !isNaN(parseFloat(watchAmount.replaceAll(",", ""))) &&
            portfolioAmount &&
            !isNaN(portfolioAmount)
        ) {
            if (parseFloat(watchAmount.replaceAll(",", "")) > portfolioAmount) {
                setError("amount", {
                    type: "server",
                    message: "Amount must be less than your portfolio amount",
                });
                console.log(errors);
                return false;
            }
        }
        return true;
    };

    // useEffect(() => {
    //     loanAmountCheck();
    // }, [watchAmount]);

    const calculateMaximumLoanAmount = async () => {
        setLoadingPortfolioAmount(true);
        const portfolioInfoAmount = await loanRequests.getPortforlioInfo();
        if (portfolioInfoAmount.status === 200) {
            let totalAmount = 0;
            portfolioInfoAmount.data?.data.forEach((portfolio) => {
                totalAmount += portfolio.portfolio;
            });
            totalAmount = totalAmount * 0.5;
            setPortfolioAmount(totalAmount);
            setLoadingPortfolioAmount(false);
        } else {
            setPortfolioAmount(400000);
            setLoadingPortfolioAmount(false);
        }
    };

    useEffect(() => {
        calculateMaximumLoanAmount();
    }, []);

    const getBankInfo = async (
        inputValue: string,
        callBack: (option: any) => void
    ) => {
        if (allBanks.length === 0) {
            const getBankOptions = (
                await loanRequests.getAllBanksWithTheirCodes()
            ).map((bank) => {
                return {
                    label: bank.name,
                    value: {
                        disbursementBankCode: bank.code,
                        disbursementBankName: bank.name,
                    },
                };
            });
            setAllBanks(getBankOptions);

            return getBankOptions.filter((bank) =>
                bank.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        }

        return allBanks.filter((bank) =>
            bank.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

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

                {/* <p>
                    Maximum loan amount based on your portfolio is:{" "}
                    {portfolioAmount !== null ? (
                        loadingPortfolioAmount ? (
                            "Loading "
                        ) : (
                            "N  " + portfolioAmount
                        )
                    ) : (
                        <>
                            {
                                "(An error occured while loading your max loan amount, please "
                            }
                            <span
                                className="hover:underline text-primaryColor cursor-pointer"
                                onClick={() => {
                                    calculateMaximumLoanAmount();
                                }}
                            >
                                {"refresh)"}
                            </span>
                        </>
                    )}{" "}
                </p> */}
            </div>
            <div className="w-full py-20 space-y-16  text-darkTextColor">
                {/*amount*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <Controller
                        control={control}
                        name="amount"
                        // rules={{
                        //     required: {
                        //         value: true,
                        //         message: "Amount is required",
                        //     },
                        //     maxLength: { value: 2, message: "Hello" },
                        //     // validate: (value) => {
                        //     //     return loanAmountCheck(value);
                        //     // },
                        // }}
                        render={({ field: { onChange, value } }) => (
                            <CurrencyInputField
                                placeholder="Amount"
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
                {/* repaymentAmount (should be gotten from backend )*/}
                <div>
                    <FloatingPlaceholderTextField
                        register={register("repaymentAmount")}
                        type="text"
                        placeholder="Repayment Amount"
                        readOnly={true}
                        errorMessage={errors?.interest?.message}
                    />
                </div>
                {/* repayment date (gotten from backend )*/}
                <div>
                    <FloatingPlaceholderTextField
                        register={register("repaymentDate")}
                        type="text"
                        placeholder="Repayment Date"
                        readOnly={true}
                        errorMessage={errors?.interest?.message}
                    />
                </div>
                {/* Account Number */}
                <div>
                    <FloatingPlaceholderTextField
                        register={register("disbursementNUBAN")}
                        type="text"
                        placeholder="Account Number"
                        errorMessage={errors?.disbursementNUBAN?.message}
                    />
                </div>
                {/* Bank */}
                <div>
                    <Controller
                        name="disbursementBankInfo"
                        control={control}
                        render={({ field: { onChange } }) => {
                            return (
                                <AsyncDropdown
                                    loadOptions={getBankInfo}
                                    defaultOptions
                                    cacheOptions
                                    placeholder="Select A Bank"
                                    onChange={onChange}
                                    errorMessage={
                                        errors.disbursementBankInfo?.message
                                    }
                                />
                            );
                        }}
                    />
                </div>

                {/* Account Name */}
                <div>
                    <FloatingPlaceholderTextField
                        register={register("disbursementAccountName")}
                        type="text"
                        readOnly={true}
                        placeholder="Account Name"
                        errorMessage={errors?.disbursementNUBAN?.message}
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
                <div className="flex items-center space-x-3 relative">
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
                    <span className="text-sm">
                        I agree to the Terms and Conditions{" "}
                        <span className="text-primaryColor text-xl font-bold">
                            {errors.termsAndCondition?.message ? "*" : ""}
                        </span>
                    </span>

                    <input
                        type="checkbox"
                        id="LoanApplication__termsAndCondition"
                        className="hidden"
                        {...register("termsAndCondition")}
                    />
                </div>

                <button
                    className={`w-full md:w-1/2 btn1 `}
                    type="button"
                    disabled={
                        isButtonLoading ||
                        loadingPortfolioAmount ||
                        portfolioAmount === null
                    }
                    onClick={onSubmit}
                >
                    {isButtonLoading ? "Loading..." : "Proceed"}
                </button>
            </div>
        </div>
    );
}

export default Form1;
