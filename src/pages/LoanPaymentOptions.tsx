import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// icons
import { FaAngleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

// components
import { useDispatch, useSelector } from "react-redux";
import {
    LoanOption,
    TransferForm,
} from "../components/pages/LoanPaymentOptions";
import BankCardForm from "../components/pages/LoanPaymentOptions/BankCardForm";
import { authSelector } from "../state/redux/authSlice";
import { loanSelector, setLoanState } from "../state/redux/loanSlice";
import { AppDispatch } from "../state/redux/store";
import { paths } from "../utils/constants/allPaths";

function LoanPaymentOptions() {
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();
    // get application reference from the params
    const { applicationreference } = useParams<{
        applicationreference: string;
    }>();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedDisbursedLoan, disbursedLoanList } =
        useSelector(loanSelector);

    // get user info
    const { user } = useSelector(authSelector);

    useEffect(() => {
        if (!user) {
            navigate(-1);
        }
        if (applicationreference && disbursedLoanList) {
            const index = parseInt(applicationreference);
            if (!isNaN(index) && index < disbursedLoanList.length) {
                dispatch(
                    setLoanState({
                        selectedDisbursedLoan: disbursedLoanList[index],
                    })
                );
            } else {
                setInvalidLoan(true);
            }
        } else {
            navigate(-1);
        }

        return () => {
            dispatch(setLoanState({ selectedDisbursedLoan: null }));
        };
    }, []);
    const [invalidLoan, setInvalidLoan] = useState(false);

    //// PAYSTACK

    const optionPick = (value: "bankCard" | "transfer") => {
        if (value === selectedOption) {
            setSelectedOption("");
            return;
        }
        setSelectedOption(value);

        switch (value) {
            case "bankCard":
                // if (user) {
                //     initializePayment(onSuccess, onClose);
                // }
                return;
            default:
                return;
        }
    };

    const dueOnLoanDays = useMemo(() => {
        let dueOn: number = -1;
        if (selectedDisbursedLoan) {
            dueOn = Math.ceil(
                (Date.parse(selectedDisbursedLoan.dueOn) - Date.now()) /
                    (1000 * 60 * 60 * 24)
            );
        }

        return dueOn;
    }, [selectedDisbursedLoan]);

    return (
        <DefaultLayout>
            <>
                <div className="w-full flex justify-between ">
                    <FaAngleLeft
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                    <IoMdClose
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                </div>

                <div className="py-10">
                    <h1 className="heading1">Loan Payment Options</h1>
                </div>

                {/* {pendingLoan.isLoading ? (
                    <div className="py-44 w-full justify-center items-center flex">
                        <AiOutlineLoading className="animate-spin text-primaryColor text-4xl" />
                    </div>
                ) : pendingLoan.isError ? (
                    <div className="py-44 w-full justify-center items-center flex text-primaryColor">
                        An Error occured while getting your loan info
                    </div>
                ) :  */}
                {invalidLoan ? (
                    <div className="py-44 w-full justify-center items-center flex text-primaryColor">
                        Loan is invalid
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 p-8 mb-10 bg-bgColor rounded-md max-w-md mx-auto">
                            <div className="flex justify-between">
                                <h1>Loan Amount: </h1>
                                <h1 className={"font-semibold"}>
                                    <span className="text-primaryColor">N</span>{" "}
                                    {selectedDisbursedLoan?.loanAmount}
                                </h1>{" "}
                            </div>
                            <div className="flex justify-between">
                                <h1>Outstanding Amount:</h1>
                                <h1 className={"font-semibold"}>
                                    <span className="text-primaryColor">N</span>{" "}
                                    {selectedDisbursedLoan &&
                                        -selectedDisbursedLoan.bookBalance}
                                </h1>
                            </div>
                            {/* <div className="flex justify-between">
                        <h1>Amount Paid:</h1>
                        <h1 className={"font-semibold"}>
                            {selectedDisbursedLoan && (
                                <>
                                    <span className="text-primaryColor">N</span>{" "}
                                    {selectedDisbursedLoan?.loanAmount +
                                    selectedDisbursedLoan?.bookBalance}
                                </>
                            )}
                        </h1>
                    </div> */}
                            <div className="flex justify-between">
                                <h1>Days Left: </h1>
                                <h1 className={"font-semibold"}>
                                    {dueOnLoanDays > 0 && dueOnLoanDays}
                                </h1>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <LoanOption
                                value="transfer"
                                onClick={optionPick}
                                label=" Transfer"
                                isSelected={
                                    selectedOption === "transfer" ? true : false
                                }
                            >
                                <TransferForm />
                            </LoanOption>
                            <LoanOption
                                value="bankCard"
                                onClick={optionPick}
                                label="Bank Card"
                                isSelected={
                                    selectedOption === "bankCard" ? true : false
                                }
                            >
                                {/* <div /> */}
                                <BankCardForm />
                            </LoanOption>
                        </div>
                    </>
                )}
            </>
        </DefaultLayout>
    );
}

export default LoanPaymentOptions;
