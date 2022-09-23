import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { allLoanQueryKey } from '../../state/react-query/keys';
import { loanSelector, setListState } from '../../state/redux/loanSlice';
import { AppDispatch } from '../../state/redux/store';
import { Loan } from '../../typings';
import { loanRequests } from '../requests/loanRequests';

export const useLoans = (customerNo: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const loansRequestState = useQuery<Loan[], Error>(
        allLoanQueryKey(),
        () => loanRequests.getUserLoans(customerNo!),
        {
            onSuccess: (data) => {
                dispatch(setListState({ loanList: data }));
            },
        }
    );
    const loanState = useSelector(loanSelector);

    return { loanState, loansRequestState };
};
