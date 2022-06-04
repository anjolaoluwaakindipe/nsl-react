import React from "react";
import Popup from "reactjs-popup";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";
import formatMoney from "../../../utils/moneyFormatter";

type LoanBalanceCardProp = {
    title: string;
    amount: number;
    tenor: string;
    days: string;
    status: string;
};

function LoanBalanceCard(prop: LoanBalanceCardProp) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-between space-y-3  bg-gradient-to-br from-white via-yellow-100 to-yellow-200 p-5 rounded-md shadow-lg h-62 min-w-[300px] cursor-pointer "
        onClick={()=>navigate(paths.TERM_LOAN)} >
            <div>
                <div className="flex items-center justify-between">
                    <h6 className="italic text-xs font-light">{prop.status}</h6>
                    <Popup
                        trigger={
                            <div>
                                <BsThreeDotsVertical className="cursor-pointer" />
                            </div>
                        }
                        position="bottom left"
                        on="click"
                        closeOnDocumentClick
                        mouseLeaveDelay={0}
                        mouseEnterDelay={0}
                        contentStyle={{ padding: "0px", border: "none" }}
                        arrow={false}
                    >
                        <div className=" space-y-2">
                            <div
                                className="px-5 py-3 bg-white text-primaryColor cursor-pointer"
                                onClick={() =>
                                    navigate(paths.LOAN_PAYMENT_OPTIONS)
                                }
                            >
                                {" "}
                                Repay
                            </div>
                            <div className="px-5 py-3 bg-white text-primaryColor cursor-pointer">
                                {" "}
                                Rollover
                            </div>
                        </div>
                    </Popup>
                </div>
                <h2 className="  text-black text-md pt-8">{prop.title}</h2>
                <h4 className=" text-primaryColor text-2xl font-extrabold ">
                    N {formatMoney(prop.amount)}
                </h4>
            </div>

            <h6 className=" text-primaryColor font-light italic text-[10px] flex justify-between">
                <div>{prop.tenor}</div>

                <div className=" text-xs inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline bg-primaryColor text-white rounded-full float-right">
                    {" "}
                    {prop.days}{" "}
                </div>
            </h6>
        </div>
    );
}

export default LoanBalanceCard;
