import React from "react";
import toast from "react-hot-toast";
import { usePaystackPayment } from "react-paystack";
import { paths } from "../utils/constants/allPaths";
import axios from "axios";
import { PaystackProps } from "react-paystack/dist/types";
import { authSelector } from "../state/redux/authSlice";
import { useSelector } from "react-redux";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import NavBarLayout from "../components/layout/NavBarLayout";
import DefaultLayout from "../components/layout/DefaultLayout";
import cardRequest from "../services/requests/cardRequest";
import { useCards } from "../services/customHooks/useCards";

function AddCardInfo() {
    const navigate = useNavigate();

    const { email, firstName, lastName, phoneNumber, customerNo } =
        useSelector(authSelector).user!;

    const { cardState } = useCards(customerNo!);
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
                    navigate(paths.USER_DASHBOARD);
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
    const onClose = () => {
        console.log("close");
    };

    const initializePayment = usePaystackPayment(config);

    return (
        <NavBarLayout>
            <DefaultLayout>
                <div>
                    <div className="flex justify-between items-center pt-10 pb-5 border-b-2 border-gray-200 text-2xl">
                        <h4 className="text-accentColor ">Account Details</h4>
                    </div>

                    <form
                        className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
                        autoComplete="off"
                        autoSave="off"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div className="col-span-12 w-full ">
                            You are required to provide at least one
                            credit/debit card in order to apply for a loan. A
                            charge of N50.00 wil be charged from your card as
                            your registration fee and in order to verify your
                            card. You can always provide more than one card.
                        </div>

                        <div className="col-span-12 ">
                            {/* <button
                        className="btn1 "
                        // onClick={()=>{openModalFunc("CardDetailsModal")}}
                    >
                        <AiFillPlusCircle />
                        <span>Add Card</span>
                    </button> */}
                        </div>

                        <div className="col-span-12 flex justify-between space-x-10">
                            <button
                                className={`btn1 bg-transparent border-2 hover:bg-transparent border-primaryColor text-primaryColor  w-full md:w-48`}
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>

                            <button
                                className={`btn1  flex items-center space-x-2  w-full md:w-48`}
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
                            >
                                <AiFillPlusCircle />
                                <span>Add Card</span>
                            </button>
                        </div>
                    </form>
                </div>
            </DefaultLayout>
        </NavBarLayout>
    );
}

export default AddCardInfo;
