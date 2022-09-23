import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/redux/store';
import { CardInfo } from '../../typings';
import { useQuery } from 'react-query';
import { allCardsQueryKey } from '../../state/react-query/keys';
import cardRequest from '../requests/cardRequest';
import { setCardState, cardSelector } from '../../state/redux/cardSlice';
import { useEffect } from 'react';
export const useCards = (customerNo: string) => {
    const cardState = useSelector(cardSelector);
    const dispatch = useDispatch<AppDispatch>();
    const cards = useQuery<CardInfo[], Error>(
        allCardsQueryKey(),
        () => cardRequest.getAllCards(customerNo!),
        {
            onSuccess: (data) => {
                dispatch(
                    setCardState({
                        cardList: data,
                        isLoading: false,
                        isError: false,
                    })
                );
            },
            onError: (err) => {
                if (cardState.cardList) return;
                dispatch(setCardState({ isError: true, isLoading: false  }));
            },
        }
    );
    useEffect(() => {
        dispatch(setCardState({ isLoading: true }));
    }, [cards.isLoading]); // eslint-disable-line


    return {cardRequestState: cards, cardState};
};