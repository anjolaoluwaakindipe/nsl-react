import React from "react";
import LoanBalanceCard from "./LoanBalanceCard";

function LoanBalanceDet() {
    return (
        <div className="w-full px-5 md:px-10">
            <div className="flex justify-start md:justify-between items-center overflow-x-scroll space-x-10 scrollbar ">
                <LoanBalanceCard
                    status="#active"
                    title="Term Loan"
                    amount={500000}
                    tenor=" 3months"
                    days=" 32"
                />
            </div>
        </div>
    );
}

export default LoanBalanceDet;
