import React from "react";
import {
    clearAuthState,
    authSelector,
} from "../../../../state/redux/authSlice";
import { paths } from "../../../../utils/constants/allPaths";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../state/redux/store";
import { cardSelector, setCardState } from "../../../../state/redux/cardSlice";
import toast from "react-hot-toast";
import cardRequest from "../../../../services/requests/cardRequest";
import { useLoans } from '../../../../services/customHooks/useLoans';

function DeleteCardModal(prop: { cancelModal: () => void }) {
    const dispatch = useDispatch<AppDispatch>();
   
    const selectedCard = useSelector(cardSelector).selectedCard;
    const cardList = useSelector(cardSelector).cardList;
    const user = useSelector(authSelector).user;
     const {loanState} = useLoans(user?.customerNo!);

    const onDeleteCard = async () => {
        if (selectedCard && user && cardList && loanState.loanList) {
            if(loanState.loanList.find(loan => loan.statusCode === "DISBURSED")){
                toast.error(
                    "Cannot delete this card. You have a disbursed loan already active on your account!!!",
                    { position: "top-right" }
                );
                prop.cancelModal();
                return;
            }

            if (cardList.length === 1) {
                toast.error(
                    "Cannot delete, because your account requires at least one card!!!",
                    { position: "top-right" }
                );
                prop.cancelModal();
                return;
            }
            const deleteCardToast = toast.loading("Deleting card...", {
                position: "top-left",
            });
            const deleteCardResponse = await cardRequest.deleteCard({
                customerNo: user.customerNo!,
                cardId: selectedCard.id.toString(),
            });
            if (deleteCardResponse.status === 200) {
                toast.success("Card deleted", { id: deleteCardToast });
                dispatch(
                    setCardState({
                        cardList: cardList.filter(
                            (card) => card.id !== selectedCard.id
                        ),
                    })
                );
            } else {
                toast.error(
                    "An error occured while deleting your card. Please try again later.",
                    { id: deleteCardToast }
                );
            }
            prop.cancelModal();
        }
    };
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <h3 className="pt-5 text-2xl md:text-4xl text-center font-bold text-primaryColor">
                Deleting Card
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-xl  py-10">
                Are you sure you want to delete card{" "}
                <span className="whitespace-nowrap">
                    {" "}
                    (**** **** **** {
                        selectedCard?.authorizationData.last4
                    }){" "}
                </span>
                ?
            </h5>
            <button
                className="md:text-xl py-5 px-5 bg-accentColor w-30 rounded-xl text-white"
                onClick={prop.cancelModal}
            >
                Cancel
            </button>

            <button
                className="md:text-xl py-5 px-4 bg-secondaryColor w-30 rounded-xl float-right"
                onClick={onDeleteCard}
            >
                Proceed
            </button>
        </div>
    );
}

export default DeleteCardModal;
