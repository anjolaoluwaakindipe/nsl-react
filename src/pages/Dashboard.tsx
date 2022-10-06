import React from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import NavBarLayout from '../components/layout/NavBarLayout';
import { Header, LoanActivity, LoanBalanceDet, ZeroState } from '../components/pages/UserDashboard';
import { useLoans } from '../services/customHooks/useLoans';
import cardRequest from '../services/requests/cardRequest';
import { allCardsQueryKey } from '../state/react-query/keys';
import { authSelector } from '../state/redux/authSlice';
import { cardSelector, setCardState } from '../state/redux/cardSlice';
import { AppDispatch } from '../state/redux/store';
import { CardInfo } from '../typings';

function Dashboard() {
    const { customerNo } = useSelector(authSelector).user!;
    const cardState = useSelector(cardSelector);
    const dispatch = useDispatch<AppDispatch>();
    const {loansApplicationRequestState} = useLoans(customerNo!);

    const cards = useQuery<CardInfo[], Error>(
        allCardsQueryKey(),
        () => cardRequest.getAllCards(customerNo!),
        {
            onSuccess: (data) => {
                dispatch(
                    setCardState({
                        cardList: data,
                        isError: false,
                        isLoading: false,
                    })
                );
            },
            onError: (err) => {
                if (cardState.cardList) return;
                dispatch(setCardState({ isError: true, isLoading: false }));
            },
        }
    );

    useEffect(() => {
        dispatch(setCardState({ isLoading: cards.isLoading }));
    }, [cards.isLoading]); // eslint-disable-line

    return (
        <NavBarLayout>
            <div className="bg-bgColor2 min-h-screen">
                <div className="md:max-w-6xl md:mx-auto w-full">
                    <Header />
                    {loansApplicationRequestState.isLoading ? (
                        <div className="w-full bg-bgColor h-[40vh] flex justify-center items-center">
                            <ClipLoader color="rgba(23, 120, 7, 1)" />
                        </div>
                    ) : loansApplicationRequestState.isSuccess ? (
                        !loansApplicationRequestState.data.length ? (
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
