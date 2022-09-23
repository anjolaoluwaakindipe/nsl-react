import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";
import StatusDet from "./StatusDet";
import { useSelector } from "react-redux";
import { cardSelector } from "../../../state/redux/cardSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useModal } from "../../../services/customHooks/useModal";

function LoanActivity() {
    const cardstate = useSelector(cardSelector);
    const navigate = useNavigate();
    const cardInfoId = {
        loadingState: "cardInfo.loading",
        errorState: "cardInfo.error",
    };

    const { openModalFunc } = useModal("AddCardModal", true);

    const newLoanFunc = () => {
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

    useEffect(() => {
        if (!cardstate.isLoading) {
            toast.dismiss(cardInfoId.loadingState);
        }
        if (!cardstate.isError) {
            toast.dismiss(cardInfoId.errorState);
        }
    }, [cardstate.isLoading, cardstate.isError]);

    return (
        <div className="mt-10 md:p-10 p-5">
            <div className="lg:px-10 pb-3 w-full flex justify-between ">
                <h3 className="md:text-justify font-bold">Loan Requests</h3>
                <button
                    className="btn1 py-1 px-2 flex md:px-4 md:py-4"
                    onClick={newLoanFunc}
                >
                    <div>+</div>
                    <div className="hidden md:block pl-2"> New Loan</div>
                </button>
            </div>

            <div className="overflow-x-scroll md:overflow-auto w-full mb-10">
                <div className="space-y-5 pt-5  p-0 w-[600px] sm:w-full text-sm md:text-md ">
                    <div className="md:p-10 p-5 w-full grid grid-cols-4 gap-20 bg-white font-semibold text-primaryColor rounded-t-xl ">
                        <h3 className="text-center">Loan Type</h3>
                        <h3 className="text-center"> Amount</h3>
                        <h3 className="text-center">Status </h3>
                        <h3 className="text-center">View</h3>
                    </div>

                    <StatusDet />
                </div>
            </div>
        </div>
    );
}

export default LoanActivity;

//
