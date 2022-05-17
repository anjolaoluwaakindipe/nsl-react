import React from "react";

type LoanBalanceCardProp = {
    title:string
    amount:number
    tenor: string
    days: string
    status: string
}

function LoanBalanceCard(prop:LoanBalanceCardProp) {
    return (
        <div className="flex flex-col space-y-3  bg-white px-7 py-5 rounded-sm">
            <h6 className="italic text-xs font-light">{prop.status}</h6>
            <h2 className="  text-primaryColor text-lg">{prop.title}</h2>
            <h4 className=" font-bold text-primaryColor text-2xl ">{prop.amount}</h4>
            <h6 className=" text-primaryColor font-light italic text-xs float-left">{prop.tenor} 
            <span className=" text-primaryColor text-xs inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline bg-gray-200 text-gray-700 rounded-full float-right"> {prop.days} </span>
            </h6>
            
        </div>
    );
}

export default LoanBalanceCard;
