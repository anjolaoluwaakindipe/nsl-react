import React from "react";
import LoanBalanceCard from "./LoanBalanceCard";
import { useSelector } from "react-redux";
import { loanSelector } from "../../../state/redux/loanSlice";
import { SubmittedLoanApplication } from "../../../typings";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useLoans } from "../../../services/customHooks/useLoans";
import { authSelector } from "../../../state/redux/authSlice";

function NoActiveLoanElement() {
    return (
        <div className="bg-white p-20 text-primaryColor rounded-lg font-semibold">
            No active loans available
        </div>
    );
}

function LoanLoaderIcon() {
    return <AiOutlineLoading />;
}

function LoanBalanceDet() {
    const { loanApplicationList, disbursedLoanList } =
        useSelector(loanSelector);
    const [activeLoans, setActiveLoans] = useState<
        SubmittedLoanApplication[] | null
    >(null);
    const { user } = useSelector(authSelector);
    const { disbursedLoanRequestState } = useLoans(user?.customerNo!);

    // useEffect(() => {
    //     if (loanApplicationList) {
    //         setActiveLoans(
    //             loanApplicationList?.filter((loan) =>
    //                 ["DISBURSED"].includes(loan.statusCode)
    //             )
    //         );
    //     }
    // }, [loanApplicationList]);

    return (
        <div className="w-full px-5 md:px-10 container">
            <div className="flex justify-start items-center overflow-x-scroll space-x-10 scrollbar  py-4">
                {disbursedLoanRequestState.isLoading ? (
                    <div className="p-10 bg-white rounded-md">
                        <AiOutlineLoading className="animate-spin text-primaryColor text-4xl" />
                    </div>
                ) : disbursedLoanRequestState.isError ? (
                    <div className="py-44 w-full justify-center items-center flex text-primaryColor">
                        An Error occured while fetching your active Loans
                    </div>
                ) : disbursedLoanList?.length !== 0 && disbursedLoanList ? (
                    disbursedLoanList.map((loan, index) => {
                        return (
                            <LoanBalanceCard
                                disbursedLoan={loan}
                                key={index}
                                status={loan.status}
                                title="Term Loan"
                                dueOn={loan.dueOn}
                                amount={loan.loanAmount || parseFloat("0")}
                                tenor={`${loan.loanPurpose} ${loan && "days"}`}
                                days=" 32"
                                id={index.toString()}
                            />
                        );
                    })
                ) : (
                    <NoActiveLoanElement />
                )}
            </div>
        </div>
    );
}

export default LoanBalanceDet;
