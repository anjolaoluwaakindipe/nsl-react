import React, { useMemo } from "react";
import Popup from "reactjs-popup";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";
import formatMoney from "../../../utils/moneyFormatter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state/redux/store";
import { setLoanState } from "../../../state/redux/loanSlice";
import { DisbursedLoan } from "../../../typings";

type LoanBalanceCardProp = {
    title: string;
    amount: number;
    tenor: string;
    days: string;
    dueOn: string;
    status: string;
    id: string;
    disbursedLoan: DisbursedLoan;
};

function LoanBalanceCard(prop: LoanBalanceCardProp) {
    const navigate = useNavigate();

    const goToLoanPaymentOption = () => {
        navigate(paths.LOAN_PAYMENT_OPTIONS + "/" + prop.id);
    };
    const goToTermLoan = () => {
        navigate(paths.TERM_LOAN + "/" + prop.id);
    };

    const dueOnLoanDays = useMemo(() => {
        let dueOn: number = -1;
        if (prop.dueOn) {
            dueOn = Math.ceil(
                (Date.parse(prop.dueOn) - Date.now()) / (1000 * 60 * 60 * 24)
            );
        }

        return dueOn;
    }, []);
    return (
        <div
            className="flex flex-col justify-between space-y-3  bg-white p-5 rounded-md shadow-lg h-62 min-w-[300px] cursor-pointer hover:animate-pulser  "
            onClick={goToTermLoan}
        >
            <div>
                <div className="flex items-center justify-between  ">
                    <h2 className="  text-black text-md ">Loan Amount</h2>
                    <Popup
                        trigger={
                            <div>
                                <BsThreeDotsVertical className="cursor-pointer" />
                            </div>
                        }
                        position={["top right", "top left"]}
                        on="click"
                        keepTooltipInside=".container"
                        closeOnDocumentClick
                        mouseLeaveDelay={0}
                        mouseEnterDelay={0}
                        contentStyle={{ padding: "0px", border: "none" }}
                        arrow={true}
                    >
                        <div className="rounded-md bg-secondaryColor bg-opacity-5 overflow-hidden">
                            <div
                                className="px-5 py-3   text-primaryColor cursor-pointer"
                                onClick={goToLoanPaymentOption}
                            >
                                {" "}
                                Repay
                            </div>
                            <div className="w-full h-[1px] bg-primaryColor" />
                            <div className="px-5 py-3  text-primaryColor cursor-pointer">
                                {" "}
                                Rollover
                            </div>
                        </div>
                    </Popup>
                </div>

                <h4 className=" text-primaryColor text-3xl font-semibold  py-6">
                    N {formatMoney(prop.amount)}
                </h4>
            </div>

            <div className="text-sm italic">
                <span className="font-light">Status: </span>
                <span className="font-semibold text-primaryColor">
                    {prop.status.toUpperCase()}
                </span>
            </div>

            <div className=" font-light italic text-[15px] flex justify-between">
                <div> Tenor: {prop.tenor}</div>

                <div className=" text-sm inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline  text-secondaryColor rounded-full float-right">
                    {" "}
                    {dueOnLoanDays}
                    {" days left"}
                </div>
            </div>
        </div>
    );
}

export default LoanBalanceCard;
