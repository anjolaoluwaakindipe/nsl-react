import React from "react";
import Status from "./Status";
import EmptyStatus from "./EmptyStatus";
import { useSelector } from "react-redux";
import { loanSelector } from "../../../state/redux/loanSlice";
import formatMoney from "../../../utils/moneyFormatter";

function StatusDet() {
    const loanList = useSelector(loanSelector).loanList;

    return (
        <div className="w-full">
            <div className="space-y-5  p-0  text-sm md:text-md">
                {loanList ? (
                    loanList
                        .filter((loan) => loan.statusCode !== "DISBURSED")
                        .map((loan) => {
                            return (
                                <Status
                                    key={loan._id}
                                    applicationReference={
                                        loan.applicationReference
                                    }
                                    loantype={loan.loanProductName}
                                    amount={formatMoney(
                                        parseFloat(loan.amount)
                                    )}
                                    statustype={loan.statusCode}
                                    status={loan.status}
                                />
                            );
                        })
                ) : (
                    <EmptyStatus />
                )}

                {/* <Status
                    loantype="School Loan"
                    amount="900,000"
                    statustype={2}
                    statusview={2}
                /> */}
            </div>
        </div>
    );
}

export default StatusDet;
