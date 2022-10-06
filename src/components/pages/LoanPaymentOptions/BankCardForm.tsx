import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
// input patterns
import {
    currency,
    numbersNoDecimal,
} from "../../../utils/constants/inputValidationPatterns";

// validation
import { bankCardValidation } from "../../../utils/validation/loanPaymentOption";
import CurrencyInputField from "../../shared/Inputs/TextFields/CurrencyInputField";
import { joiResolver } from "@hookform/resolvers/joi";
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/redux/authSlice";
import { PaystackProps } from "react-paystack/dist/types";
import axios from "axios";
import toast from "react-hot-toast";
import { usePaystackPayment } from "react-paystack";
import { useMemo } from "react";
import { loanRequests } from "../../../services/requests/loanRequests";
import { loanSelector } from "../../../state/redux/loanSlice";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";

// type BankCardFormProp = {
//     maximumAmount: number;
// };

function BankCardForm() {
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const {
        formState: { errors },
        handleSubmit,
        watch,
        control,
    } = useForm<{ amount: string }>({
        defaultValues: {
            amount: "1000",
        },
        resolver: joiResolver(bankCardValidation),
    });

    const watchPaymentAmount = watch("amount");

    const onSubmitForm = handleSubmit((data) => {
        if (
            !isNaN(parseFloat(watchPaymentAmount)) &&
            user &&
            selectedDisbursedLoan
        ) {
            initializePayment(onSuccess, onClose);
        }
    });

    const { user } = useSelector(authSelector);
    const { selectedDisbursedLoan } = useSelector(loanSelector);
    const navigate = useNavigate();

    const paymentAmountCalc = useMemo(() => {
        let newValue: string = "";
        if (watchPaymentAmount.includes(".")) {
            newValue = watchPaymentAmount.replaceAll(".", "").replace(",", "");
        } else {
            newValue = watchPaymentAmount.replace(",", "").concat("00");
        }

        return parseInt(newValue);
    }, [watchPaymentAmount]);
    /// PAYSTACK
    const publicKey = "pk_test_fc2bedce5657a08802e2afcd508ef4083d6b5452";
    const secretKey = "sk_test_dc69b7578ef52aac1712ac353d04b871b4c6ca8a";

    const config: PaystackProps = {
        reference: new Date().getTime().toString(),
        email: user!.email!,
        amount: paymentAmountCalc,
        publicKey: publicKey,
        firstname: user!.firstName!,
        lastname: user!.lastName!,
        phone: user!.phoneNumber!,
        channels: ["card"],
        bearer: "account",
        currency: "NGN",
        label: "NSL 24",
        "data-custom-button": "Add Card",
    };

    const getUserCardInfo = async (reference: string) => {
        return await axios
            .get("https://api.paystack.co/transaction/verify/" + reference, {
                headers: { Authorization: "Bearer " + secretKey },
            })
            .then((res) => res.data);
    };

    const onSuccess = (reference: any) => {
        setSubmitButtonDisabled(true);
        getUserCardInfo(reference.reference)
            .then(async (transaction) => {
                const authData: Record<string, any> =
                    transaction.data.authorization;
                const amount = parseInt(watchPaymentAmount.replaceAll(",", ""));
                if (!isNaN(amount) && selectedDisbursedLoan && user) {
                    const loanPaymentResponse =
                        await loanRequests.loanRepayment(
                            amount,
                            "Paystack",
                            selectedDisbursedLoan.dealno,
                            "Card",
                            `${user.lastName} ${user.firstName} ${user.middleName}`,
                            (authData.authorization_code as string).slice(5),
                            user.customerNo!
                        );

                    if (loanPaymentResponse.status === 200 && loanPaymentResponse.data.postedOK) {
                        toast.success("Loan Repayment Successful!!!", {
                            position: "top-right",
                        });
                        navigate(paths.USER_DASHBOARD, { replace: true });
                    } else {
                        toast.error(
                            "Your payment was attempted. Please check your account if any money was debitted and send an email to our customer care!!1",
                            { position: "top-right", duration: 10000 }
                        );
                    }
                }
                setSubmitButtonDisabled(false);
            })
            .catch(() => {
                toast.error(
                    "Something went wrong while verifiying your card. Please try again later."
                );
                setSubmitButtonDisabled(false);
            });
    };
    const onClose = () => {};

    const initializePayment = usePaystackPayment(config);

    return (
        <form
            action="/"
            className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            onSubmit={onSubmitForm}
            autoComplete="off"
            autoSave="off"
        >
            {" "}
            <div className=" col-span-12">
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
            <button
                className={`col-span-12 md:col-span-6 btn1  `}
                type="submit"
                disabled={isSubmitButtonDisabled}
            >
                {isSubmitButtonDisabled ? "Loading..." : "Proceed"}
            </button>
        </form>
    );
}

export default BankCardForm;
