import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../utils/constants/allPaths";
// layout
import DefaultLayout from "../components/layout/DefaultLayout";

//components
import { Header, Information, TopBar } from "../components/pages/LoanContract";
import PinCode from "../components/pages/LoanContract/PinCode";
import TermsAndAgreement from "../components/pages/LoanContract/TermsAndAgreement";
//import { Information} from "../components/pages/LoanInformation";
import { AiOutlineLoading } from "react-icons/ai";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { loanRequests } from "../services/requests/loanRequests";
import { pendingSignatureLoanQueryKey } from "../state/react-query/keys";
import { authSelector } from "../state/redux/authSlice";
import { Loan } from "../typings";
import toast from "react-hot-toast";
import { verificationRequests } from "../services/requests/verificationRequests";
function LoanContract() {
    // param variable
    const { applicationreference } = useParams<{
        applicationreference: string;
    }>();

    // state variable from authslice
    const { user } = useSelector(authSelector);

    // react-query variables
    const pendingSignatureLoan = useQuery<Loan, Error>(
        pendingSignatureLoanQueryKey(),
        () => {
            return loanRequests.getALoan(applicationreference!);
        }
    );

    // local state
    const [invalidLoan, setInvalidLoan] = useState(false); // check if loan belongs to user
    const [buttonLoading, setButtonLoading] = useState(false); // button state
    const [codeResending, setCodeResending] = useState(false);

    useEffect(() => {
        if (pendingSignatureLoan.isSuccess) {
            if (
                !user ||
                (user &&
                    pendingSignatureLoan.data.customerNo !== user.customerNo)
            ) {
                setInvalidLoan(true);
            }
        }
    }, [pendingSignatureLoan.data, user]); //eslint-disable-line

    const {
        control,
        formState: { errors },
        handleSubmit,
        setError,
        clearErrors,
        reset
    } = useForm<{ pin: string }>({
        defaultValues: {
            pin: "",
        },
        mode: "onSubmit"
    });

    const resendLoanContractPin = async () => {
        reset()
        clearErrors("pin");
        if (applicationreference) {
            setCodeResending(true);
            // generate otp
            const loanContractOtp = await loanRequests.generateLoanContractOtp(
                applicationreference
            );

            // check if otp generation was successful
            if (!loanContractOtp.data) {
                toast.error("An error occured while generating pin");
                setCodeResending(false);
                return;
            }

            // check if there is a user logged in
            if (user) {
                // make sure  otp is sent to email and phone number
                const verifyEmailRes = await verificationRequests.verifyEmail(
                    {
                        fourDigitCode: loanContractOtp.data,
                        toEmail: user.email!,
                    },
                    "loancontract",
                    user.firstName || ""
                );

                const verifyPhoneNumberRes =
                    await verificationRequests.verifySms(
                        {
                            fourDigitCode: loanContractOtp.data,
                            recipientPhoneNumber: user.phoneNumber!.replace(
                                "+",
                                ""
                            ),
                        },
                        "loancontract",
                        user.firstName || ""
                    );
                if (
                    verifyEmailRes.status === 200 ||
                    verifyPhoneNumberRes.status === 200
                ) {
                    toast.success("Pin has been sent");
                } else {
                    toast.error(
                        "An error occured when sending pin. Please try again later."
                    );
                }
                setCodeResending(false);
            }
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        setButtonLoading(true);
        console.log(data);
        if (applicationreference) {
            const otp = await loanRequests.getLoanContractOtp(
                applicationreference
            );
            console.log(otp);
            if (otp.status === 200) {
                if (otp.data === 0) {
                    setButtonLoading(false);
                    setError("pin", {
                        message: "Pin has expired please resend a new code",
                    });
                  
                    return;
                }

                if (otp.data === parseInt(data.pin)) {
                    toast.success("Pin is valid");
                } else {
                    setButtonLoading(false);
                    setError("pin", { message: "Incorrect pin" });
                   
                    return;
                }
            } else {
                toast.error("An error occured while checking pin validity");
                setButtonLoading(false);
                return;
            }
        }
        setButtonLoading(false);
    });
    const navigate = useNavigate();
    return (
        <DefaultLayout>
            <>
                <TopBar />
                <Header />
                {invalidLoan ? (
                    <div className="py-44 w-full justify-center items-center flex text-primaryColor">
                        Loan is invalid
                    </div>
                ) : pendingSignatureLoan.isLoading ? (
                    <div className="py-44 w-full justify-center items-center flex">
                        <AiOutlineLoading className="animate-spin text-primaryColor text-4xl" />
                    </div>
                ) : pendingSignatureLoan.isSuccess ? (
                    <>
                        <Information
                            key={pendingSignatureLoan.data._id}
                            originalAmount={pendingSignatureLoan.data.amount}
                            rate={pendingSignatureLoan.data.rate}
                            repaymentAmount={
                                pendingSignatureLoan.data.repaymentAmount
                            }
                        />
                        <TermsAndAgreement />

                        <form onSubmit={onSubmit}>
                            <div className="space-y-5">
                                <Controller
                                    control={control}
                                    name="pin"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Pin code is required",
                                        },
                                    }}
                                    render={({
                                        field: { onChange, value },
                                    }) => {
                                        return (
                                            <PinCode
                                                value={value}
                                                onChange={onChange}
                                            />
                                        );
                                    }}
                                />

                                <p className="error1 text-base pb-5">
                                    {" "}
                                    {errors.pin?.message}
                                </p>
                            </div>

                            <div>
                                {/* <h2 className="text-primaryColor font-semibold hover:underline cursor-pointer text-sm">
                            Generate Code
                        </h2> */}
                                <h2
                                    className={`${
                                        codeResending
                                            ? "text-gray-600"
                                            : "text-primaryColor"
                                    } font-semibold hover:underline cursor-pointer text-sm`}
                                    onClick={
                                        !codeResending
                                            ? resendLoanContractPin
                                            : undefined
                                    }
                                >
                                    {codeResending
                                        ? "Sending Code..."
                                        : "Resend Code"}
                                </h2>
                            </div>

                            <div className=" pt-10 space-x-6 w-full ">
                                <button
                                    className="btn1 md:w-52 w-1/2"
                                    type="submit"
                                    disabled={buttonLoading}
                                >
                                    {buttonLoading ? "Loading..." : "Accept"}
                                </button>

                                <button
                                    className="btn1 bg-transparent border-primaryColor border-2 w-1/2 md:w-52"
                                    onClick={() => {
                                        navigate(paths.USER_DASHBOARD);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="py-44 w-full justify-center items-center flex text-primaryColor">
                        An Error occured while getting your loan info
                    </div>
                )}
            </>
        </DefaultLayout>
    );
}

export default LoanContract;
