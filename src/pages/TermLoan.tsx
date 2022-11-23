import React, { useEffect, useState } from "react";
import NavBarLayout from "../components/layout/NavBarLayout";
import { Description } from "../components/pages/TermLoan";
import ActiveLoanDetails from "../components/pages/TermLoan/ActiveLoanDetails";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/redux/store";
import { loanSelector, setLoanState } from "../state/redux/loanSlice";
import { authSelector } from "../state/redux/authSlice";
import { paths } from "../utils/constants/allPaths";
import moment from "moment";
import { loanRequests } from "../services/requests/loanRequests";
import { useQuery } from "react-query";
import {
    disbursedLoanTransactionHistoryQueryKey,
    pendingLoanApplicationQueryKey,
} from "../state/react-query/keys";
import { useMemo } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useLoans } from "../services/customHooks/useLoans";
import { SubmittedLoanApplication } from "../typings";

function TermLoan() {
    const navigate = useNavigate();
    // get application reference from the params
    const { id } = useParams<{
        id: string;
    }>();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedDisbursedLoan, disbursedLoanList } =
        useSelector(loanSelector);
    const toDate = useMemo(() => {
        return moment(new Date().toISOString()).format("YYYYMMDD");
    }, []);

    // transaction history
    const transactioHistory = useQuery<
        {
            id: number;
            channel: string;
            postDate: string;
            narrative: string;
            reference: string;
            valueDate: string;
            amount: number;
            balanceCF: number;
            ccy: string;
        }[]
    >(
        disbursedLoanTransactionHistoryQueryKey(),
        async () => {
            const disbursedLoanTransactionHistoryResponse =
                await loanRequests.getLoanTransactionHistory(
                    selectedDisbursedLoan?.accountNo!,
                    toDate
                );

            if (disbursedLoanTransactionHistoryResponse.status === 200) {
                return disbursedLoanTransactionHistoryResponse.data.content;
            } else {
                throw new Error();
            }
        },
        { useErrorBoundary: false }
    );

    // get user info
    const { user } = useSelector(authSelector);

    useEffect(() => {
        if (!user) {
            navigate(-1);
        }
        if (id && disbursedLoanList) {
            const index = parseInt(id);
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

    const idNumber = useMemo(() => {
        return parseInt(id || "");
    }, [id]);

    return (
        <NavBarLayout>
            <div className="w-full bg-bgColor2 min-h-screen relative pb-32">
                <div>
                    <div className="md:max-w-5xl md:mx-auto w-full px-5 flex flex-col">
                        {/* Back Button */}
                        <IoIosArrowDropleftCircle
                            className="  text-2xl text-primaryColor cursor-pointer hover:brightness-75 my-5 mt-10 "
                            onClick={() => navigate(-1)}
                        />
                        {invalidLoan ? (
                            <div className="py-44 w-full justify-center items-center flex text-primaryColor">
                                Loan is invalid
                            </div>
                        ) : (
                            <>
                                <h1 className="heading1 pt-10">Term Loan</h1>
                                <Description />

                                {!isNaN(idNumber) && (
                                    <>
                                        {/* TODO: need to add additional information to the loan details. Should call Mr. Yinnka */}
                                        <ActiveLoanDetails
                                            balance={
                                                disbursedLoanList![idNumber]
                                                    .bookBalance
                                            }
                                            tenor={
                                                disbursedLoanList![idNumber]
                                                    .productCode
                                            }
                                            effectivateDate={
                                                disbursedLoanList![idNumber]
                                                    .repaymentStartDate
                                            }
                                            dueDate={
                                                disbursedLoanList![idNumber]
                                                    .dueOn
                                            }
                                        />
                                    </>
                                )}

                                <div className=" w-full">
                                    <div className="flex w-full flex-col md:flex-row space-y-3 md:space-y-0  md:justify-between md:items-end">
                                        <h1 className="text-4xl font-semibold text-primaryColor">
                                            Transaction History
                                        </h1>

                                        <button
                                            className="w-max self-end bg-transparent underline hover:no-underline p-0 text-primaryColor"
                                            onClick={() => {
                                                transactioHistory.refetch();
                                            }}
                                        >
                                            Refresh
                                        </button>
                                    </div>

                                    {transactioHistory.isLoading ? (
                                        <div className=" w-full py-48 flex justify-center items-center">
                                            <AiOutlineLoading className="text-2xl animate-spin text-primaryColor" />{" "}
                                        </div>
                                    ) : transactioHistory.isError ? (
                                        <div className="w-full my-10 py-20 bg-white rounded-md text-primaryColor">
                                            An Error occured while getting your
                                            transaction History .
                                            <span
                                                className="hover:underline cursor-pointer"
                                                onClick={() => {
                                                    transactioHistory.refetch();
                                                }}
                                            >
                                                Please refresh click here to try
                                                again.
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-scroll w-full ">
                                            <div className="min-w-[500px]">
                                                <div className="w-full grid grid-cols-4 bg-bgColor4 py-10 px-5 text-sm my-8">
                                                    <h4 className="mx-auto">
                                                        Transaction ID
                                                    </h4>
                                                    <h4 className="mx-auto">
                                                        Time
                                                    </h4>
                                                    <h4 className="mx-auto">
                                                        Amount Paid
                                                    </h4>
                                                    <h4 className="mx-auto">
                                                        Balance
                                                    </h4>
                                                </div>
                                                <div className="space-y-2">
                                                    {transactioHistory.data?.map(
                                                        (transaction) => (
                                                            <div
                                                                key={
                                                                    transaction.id
                                                                }
                                                                className="w-full grid grid-cols-4 rounded-sm bg-white py-8 px-5 text-sm"
                                                            >
                                                                <h4 className="mx-auto">
                                                                    {
                                                                        transaction.id
                                                                    }
                                                                </h4>
                                                                <h4 className="mx-auto">
                                                                    {new Date(
                                                                        transaction.postDate
                                                                    ).toLocaleDateString()}
                                                                </h4>
                                                                <h4 className="mx-auto">
                                                                    <span className="text-primaryColor mr-3">
                                                                        N
                                                                    </span>{" "}
                                                                    {transaction.amount <
                                                                    0
                                                                        ? -transaction.amount
                                                                        : transaction.amount}
                                                                </h4>
                                                                <h4 className="mx-auto">
                                                                    <span className="text-primaryColor mr-3">
                                                                        N
                                                                    </span>
                                                                    {
                                                                        -transaction.balanceCF
                                                                    }
                                                                </h4>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </NavBarLayout>
    );
}

export default TermLoan;
