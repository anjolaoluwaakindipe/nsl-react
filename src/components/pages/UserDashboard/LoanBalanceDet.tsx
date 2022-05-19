import React from "react";
import LoanBalanceCard from "./LoanBalanceCard";

function LoanBalanceDet() {
    return (
        <div className="pl-5 md:px-10">
            <div className=" flex justify-start  items-center overflow-x-scroll scrollbar md:space-x-10 space-x-5  scrollbar">
                <LoanBalanceCard
                    status="#active"
                    title="Term Loan"
                    amount={500000}
                    tenor="tenor: 3months"
                    days="32 days left"
                />
            </div>
        </div>
    );
}

export default LoanBalanceDet;
