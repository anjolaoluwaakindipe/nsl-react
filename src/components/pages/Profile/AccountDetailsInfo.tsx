import { ATMCard } from "atm-card-react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { useSelector, useDispatch } from "react-redux";

import { useCards } from "../../../services/customHooks/useCards";
import cardRequest from "../../../services/requests/cardRequest";
import { authSelector } from "../../../state/redux/authSlice";
import { useModal } from "../../../services/customHooks/useModal";
import { AppDispatch } from "../../../state/redux/store";
import { setCardState } from "../../../state/redux/cardSlice";

function AccountDetailsInfo() {
    const { email, firstName, lastName, phoneNumber, customerNo } =
        useSelector(authSelector).user!;
    const { cardRequestState, cardState } = useCards(customerNo!);
    const { openModalFunc } = useModal("DeleteCardModal", true);
    const dispatch = useDispatch<AppDispatch>();

    const publicKey = "pk_test_fc2bedce5657a08802e2afcd508ef4083d6b5452";
    const secretKey = "sk_test_dc69b7578ef52aac1712ac353d04b871b4c6ca8a";

    const config: PaystackProps = {
        reference: new Date().getTime().toString(),
        email: email!,
        amount: 5000,
        publicKey: publicKey,
        firstname: firstName!,
        lastname: lastName!,
        phone: phoneNumber!,
        channels: ["card"],
        bearer: "account",
        currency: "NGN",
        label: "NSL 24",
        "data-custom-button": "Add Card",
    };

    const getUserCardInfo = async (reference: string) => {
        return await axios
            .get("https://api.paystack.co/transaction/verify/" + reference, {
                headers: { Authorization: "Bearer " + secretKey },
            })
            .then((res) => res.data);
    };

    const onSuccess = (reference: any) => {
        getUserCardInfo(reference.reference)
            .then(async (transaction) => {
                const authData: Record<string, any> =
                    transaction.data.authorization;
                const addCardResponse = await cardRequest.addCard({
                    authdata: encodeURIComponent(JSON.stringify(authData)),
                    customerNo: customerNo!,
                    defaultcard:
                        cardState.cardList!.length === 0 ? true : false,
                    loanref: "2",
                });

                if (addCardResponse.status === 200 && addCardResponse.data.ok) {
                    toast.success("Card added successfully!!!");
                    cardRequestState.refetch();
                } else if (
                    addCardResponse.status === 200 &&
                    !addCardResponse.data.ok
                ) {
                    if (
                        addCardResponse.data.statusMessage ===
                        "Card already on file for customer"
                    ) {
                        toast.error("This is card has already been saved");
                    }
                } else {
                    throw new Error();
                }
            })
            .catch(() =>
                toast.error(
                    "Something went wrong while verifiying your card. Please try again later."
                )
            );
    };
    const onClose = () => {};

    const initializePayment = usePaystackPayment(config);

    const deleteCard = async (customerNo: string, cardId: string) => {
        if (!cardState.cardList) return;
        dispatch(
            setCardState({
                selectedCard: cardState.cardList.find(
                    (card) => card.id.toString() === cardId
                ),
            })
        );
        openModalFunc();
        if (cardState.cardList) {
        }
    };

    return (
        <div className="col-span-1 space-y-6">
            <div className="w-full flex justify-between items-end">
                <div className="flex space-x-2">
                    <h1 className="font-semibold">Account Details</h1>
                    <div className="w-6 h-6 rounded-full bg-primaryColor text-white flex justify-center items-center">
                        {cardState.cardList?.length}
                    </div>
                </div>

                <IoIosAddCircle
                    className="cursor-pointer text-primaryColor brightness-125 text-2xl"
                    onClick={() => {
                        if (cardState.cardList) {
                            initializePayment(onSuccess, onClose);
                        } else {
                            toast.error(
                                "An error occured while getting your card info",
                                { position: "top-right" }
                            );
                        }
                    }}
                />
            </div>

            <div className="grid grid-cols-2 p-6 bg-white text-sm rounded-md gap-y-8 max-w-full">
                {cardState.cardList?.map((card) => (
                    <div key={card.id} className="flex group overflow-hidden">
                        {" "}
                        <div className="pointer-events-none">
                            <ATMCard
                                holderName={
                                    card.authorizationData.account_name || "_"
                                }
                                number={
                                    "************" +
                                    card.authorizationData.last4
                                }
                                bankLogo={
                                    <h1
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 30 * 0.8,
                                            color: "white",
                                        }}
                                    >
                                        {card.authorizationData.bank.length > 20
                                            ? card.authorizationData.bank
                                                  .slice(0, 20)
                                                  .concat("...")
                                            : card.authorizationData.bank}
                                    </h1>
                                }
                                system={card.authorizationData.brand}
                                year={parseInt(card.authorizationData.exp_year)}
                                month={parseInt(
                                    card.authorizationData.exp_month
                                )}
                                scale={0.8}
                                onChange={() => {}}
                                bgColor={""}
                                lifted={true}
                            />
                        </div>
                        <MdOutlineDeleteOutline
                            className="text-2xl text-transparent group-hover:text-primaryColor duration-100 transition-all ease-in cursor-pointer"
                            onClick={() =>
                                deleteCard(card.customerNo, card.id.toString())
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AccountDetailsInfo;
