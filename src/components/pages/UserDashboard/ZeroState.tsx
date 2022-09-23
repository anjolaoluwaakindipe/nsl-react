import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";
import { useSelector } from "react-redux";
import { cardSelector } from "../../../state/redux/cardSlice";
import { useModal } from "../../../services/customHooks/useModal";
import toast from "react-hot-toast";

function ZeroState() {
    const cardInfoId = {
        loadingState: "cardInfo.loading",
        errorState: "cardInfo.error",
    };
    const { openModalFunc } = useModal("AddCardModal", true);
    const cardstate = useSelector(cardSelector);
    const navigate = useNavigate();
    const navigateToLoanApplication = () => {
        if (cardstate.isLoading) {
            toast.loading("Getting your card info, please wait...", {
                id: cardInfoId.loadingState,
                position: "top-right",
            });
        }

        if (
            cardstate.cardList &&
            cardstate.cardList.length === 0 &&
            !cardstate.isLoading
        ) {
            openModalFunc();
        }

        if (
            !cardstate.isError &&
            cardstate.cardList &&
            cardstate.cardList.length > 0 &&
            !cardstate.isLoading
        ) {
            navigate(paths.LOAN_APPLICATION);
            return;
        }

        if (cardstate.isError && !cardstate.isLoading) {
            toast.error(
                "An error occured while getting your card info. Please refresh the page",
                {
                    id: cardInfoId.errorState,
                    position: "top-right",
                }
            );
        }
    };
    return (
        <div className="bg-white relative flex flex-col-reverse md:flex-row items-center pt-10">
            <div className="p-5 md:p-10 md:min-w-[100px] md:max-w[200px] lg:min-w-[400px] md:max-w-[500px] w-full text-justify text-sm md:text-base">
                Based on your portfolio evalution, you are eligible to a maximum
                loan amount of N 500,000. The principal and interest shall be
                rolled over at maturity at the prevailing terms and conditions,
                if the principal and accrued interest are not received at
                maturity. Rolled over will not be more than once.
                <p className="pt-5">
                    Note: The loan will range from 30 days – 180 days
                </p>
                <button
                    className=" btn1 items-center md:px-15 md:py-5 mt-10"
                    onClick={navigateToLoanApplication}
                >
                    Apply for Loan
                </button>
            </div>

            <div className="w-full relative overflow-hidden h-[150px] sm:h-[300px] md:h-[400px] px-5 md:px-0">
                <img
                    src="/assets/discuss.svg"
                    alt="no_loan_svg"
                    className=" object-right  md:object-right object-cover h-full md:w-[1000px]  lg:w-[9000px] "
                />
            </div>
        </div>
    );
}

export default ZeroState;
