import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../utils/constants/allPaths";
import { useSelector } from "react-redux";
import { loanSelector } from "../../../../state/redux/loanSlice";
import { loanRequests } from "../../../../services/requests/loanRequests";
import toast from "react-hot-toast";
import { verificationRequests } from "../../../../services/requests/verificationRequests";
import { authSelector } from "../../../../state/redux/authSlice";

function SignLoanContractModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const selectedLoan = useSelector(loanSelector).selectedLoan;
    const user = useSelector(authSelector).user;
    const [buttonLoading, setButtonLoading] = useState(false);
    const onCancel = () => {
        prop.cancelModal();
    };

    const navigateToLoanContract = async () => {
        if (selectedLoan) {
            setButtonLoading(true);
            // generate otp
            const loanContractOtp = await loanRequests.generateLoanContractOtp(
                selectedLoan.applicationReference
            );
            console.log(loanContractOtp);
            // check if otp was gotten
            if (!loanContractOtp.data) {
                toast.error("An error occured while generating pin");
                setButtonLoading(false);
                return;
            }

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
                    navigate(
                        paths.LOAN_CONTRACT +
                            "/" +
                            selectedLoan.applicationReference
                    );
                    prop.cancelModal();
                } else {
                    toast.error(
                        "An error occured when sending pin. Please try again later."
                    );
                }
            }
        }

        setButtonLoading(false);
    };
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <h3 className="pt-5 text-2xl md:text-4xl font-bold text-primaryColor text-center">
                Sign Contract
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-xl  py-10">
                A pin will be sent to both your email and phone number. Please
                use this pin to confirm that you agree to our terms and
                agreement of the loan contract.
            </h5>

            <div className="flex space-x-5">
                <button
                    className="btn1 w-full"
                    onClick={navigateToLoanContract}
                    disabled={buttonLoading}
                >
                    {buttonLoading ? "Loading..." : "OK"}
                </button>
                <button
                    className="btn1 w-full"
                    onClick={onCancel}
                    disabled={buttonLoading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default SignLoanContractModal;
