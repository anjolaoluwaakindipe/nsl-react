import React from "react";

type LoanStatCardProp = {
    title:string
    amount:number
}

function LoanStatCard(prop:LoanStatCardProp) {
    return (
        <div className="flex flex-col space-y-3 font-bold text-primaryColor bg-white px-7 py-5 rounded-sm">
            <h6 className="text-xs">{prop.title}</h6>
            <h4 className="text-lg ">{prop.amount}</h4>
        </div>
    );
}

export default LoanStatCard;
