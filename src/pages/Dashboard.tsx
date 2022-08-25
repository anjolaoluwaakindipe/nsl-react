import React from "react";
import { useQuery } from "react-query";
import NavBarLayout from "../components/layout/NavBarLayout";
import { allLoanQueryKey } from "../state/react-query/keys";
import { authSelector } from "../state/redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { loanRequests } from "../services/requests/loanRequests";
import ClipLoader from "react-spinners/ClipLoader";

import {
    Header,
    LoanActivity,
    LoanBalanceDet,
    ZeroState,
} from "../components/pages/UserDashboard";
import { setListState } from "../state/redux/loanSlice";
import { Loan } from "../typings";

function Dashboard() {
    const { customerNo } = useSelector(authSelector).user!;
    const dispatch = useDispatch();
    const loans = useQuery<Loan[], Error>(
        allLoanQueryKey(),
        () => loanRequests.getUserLoans(customerNo!),
        {
            onSuccess: (data) => {
                dispatch(setListState({ loanList: data }));
            },
        }
    );


    return (
        <NavBarLayout>
            <div className="bg-bgColor2 min-h-screen">
                <div className="md:max-w-6xl md:mx-auto w-full">
                    <Header />
                    {loans.isLoading ? (
                        <div className="w-full bg-bgColor h-[40vh] flex justify-center items-center">
                            <ClipLoader color="rgba(23, 120, 7, 1)" />
                        </div>
                    ) : loans.isSuccess ? (
                        !loans.data.length ? (
                            <ZeroState />
                        ) : (
                            <>
                                <LoanBalanceDet />
                                <LoanActivity />
                            </>
                        )
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </NavBarLayout>
    );
}

export default Dashboard;
