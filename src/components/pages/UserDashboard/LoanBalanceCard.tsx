import React from "react";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";

type LoanBalanceCardProp = {
    title: string;
    amount: number;
    tenor: string;
    days: string;
    status: string;
};

function LoanBalanceCard(prop: LoanBalanceCardProp) {
    return (
        <div className="flex flex-col justify-between space-y-3  bg-gradient-to-br from-white via-yellow-100 to-yellow-200 p-5 rounded-md shadow-lg h-62 min-w-[300px] ">
            <div>
                <div className="flex items-center justify-between">
                    <h6 className="italic text-xs font-light">{prop.status}</h6>
                    <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                <h2 className="  text-black text-md pt-8">{prop.title}</h2>
                <h4 className=" text-primaryColor text-2xl font-extrabold ">
                    N {prop.amount.toFixed(2).toString()}
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
