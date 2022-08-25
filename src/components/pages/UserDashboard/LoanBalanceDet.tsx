import React from "react";
import LoanBalanceCard from "./LoanBalanceCard";
import { useSelector } from "react-redux";
import { loanSelector } from "../../../state/redux/loanSlice";
import { Loan } from "../../../typings";
import { useEffect, useState } from "react";
import {AiOutlineLoading} from "react-icons/ai"


function NoActiveLoanElement(){
    return <div className="bg-white p-20 text-primaryColor rounded-lg font-semibold">No active loans available</div>
}

function LoanLoaderIcon (){
    return <AiOutlineLoading/>
}

function LoanBalanceDet() {
    const { loanList } = useSelector(loanSelector);
    const [activeLoans, setActiveLoans] = useState<Loan[] | null>(null);

    useEffect(() => {
        if (loanList) {
            setActiveLoans(
                loanList?.filter((loan) => loan.statusCode === "APPROVED")
            );
        }
    }, [loanList]);




    
    return (
        <div className="w-full px-5 md:px-10">
            <div className="flex justify-start md:justify-between items-center overflow-x-scroll space-x-10 scrollbar ">
                {activeLoans?.length !== 0 && activeLoans
                    ? activeLoans.map((loan) => {
                          return (
                              <LoanBalanceCard
                                    key={loan._id}
                                  status="#active"
                                  title="Term Loan"
                                  amount={parseFloat(loan.amount || "0")}
                                  tenor={`${loan.tenor} ${loan && "days"}`}
                                  days=" 32"
                              />
                          );
                      })
                    : (activeLoans=== null ? <LoanLoaderIcon/> : <NoActiveLoanElement/>)}
            </div>
        </div>
    );
}

export default LoanBalanceDet;
