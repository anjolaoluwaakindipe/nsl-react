import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import {
    allLoanApplicationQueryKey,
    allDisbursedLoanQueryKey,
} from "../../state/react-query/keys";
import { loanSelector, setLoanState } from "../../state/redux/loanSlice";
import { AppDispatch } from "../../state/redux/store";
import { DisbursedLoan, SubmittedLoanApplication } from "../../typings";
import { loanRequests } from "../requests/loanRequests";

export const useLoans = (customerNo: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const loansApplicationRequestState = useQuery<
        SubmittedLoanApplication[],
        Error
    >(
        allLoanApplicationQueryKey(),
        () => loanRequests.getUserLoanApplications(customerNo!),
        {
            onSuccess: (data) => {
                dispatch(setLoanState({ loanApplicationList: data }));
            },
        }
    );

    const disbursedLoanRequestState = useQuery<DisbursedLoan[], Error>(
        allDisbursedLoanQueryKey(),
        () => loanRequests.getUserDisbursedLoans(customerNo!),
        {
            onSuccess: (data) => {
                dispatch(setLoanState({ disbursedLoanList: data }));
            },
        }
    );

    const loanState = useSelector(loanSelector);

    return {
        loanState,
        loansApplicationRequestState,
        disbursedLoanRequestState,
    };
};
