import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { paths } from "../../../utils/constants/allPaths";
import { useMemo } from "react";
import moment from "moment";

type ActiveLoanDetailsProps = {
    accountNumber?: string | null;
    totalLoanRepayment?: number | null;
    loanAmount?: number | null;
    interest?: number | null;
    tenor?: string | null;
    effectivateDate?: string | null;
    dueDate?: string | null;
    balance?: number | null;
};

function ActiveLoanDetails({
    accountNumber: cscsAccountNumber,
    totalLoanRepayment,
    loanAmount,
    interest,
    tenor,
    effectivateDate,
    dueDate,
    balance,
}: ActiveLoanDetailsProps) {
    const progress = useMemo(() => {
        const totalTime = moment(dueDate).diff(effectivateDate, "days");
        let daysLeft = moment(dueDate).diff(moment.now(), "days");

        if (daysLeft < 0) {
            daysLeft = 0;
        }

        console.log(totalTime);
        console.log(daysLeft);

        return {
            totalTime,
            daysLeft,
            daysPassed: totalTime - daysLeft,
        };
    }, [dueDate, effectivateDate]);

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    return (
        <div className="  w-full py-20 space-y-16 text-darkTextColor ">
            <div className="w-full bg-white p-5 md:p-10 text-sm rounded-md space-y-5">
                <h1 className=" text-14px text-primaryColor  flex flex-col md:grid md:grid-cols-6  ">
                    <div className="md:space-y-2">
                        <div className="w-full">Account Number</div>
                        <div className="text-gray-400 dark:text- ">
                            {cscsAccountNumber}
                        </div>
                    </div>
                </h1>
                <div className="border-solid w-full h-[1px] bg-gray-300" />

                <div className=" w-full flex flex-col md:grid md:grid-cols-4 md:gap-20 space-y-4 md:space-y-0">
                    {/* <h1 className=" text-14px text-primaryColor dark:text-  md:space-y-2">
                        {" "}
                        <div className="w-full">Total Loan Repayment</div>
                        <div className="text-gray-400 dark:text- ">
                            {" "}
                            {totalLoanRepayment}
                        </div>
                    </h1>

                    <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text-">
                        {" "}
                        <div className="w-full">Loan Amount</div>
                        <div className=" text-gray-400 dark:text- ">
                            {" "}
                            {loanAmount}
                        </div>
                    </h1>

                    <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text- md:space-y-2 ">
                        {" "}
                        <div className="w-full">Interest </div>
                        <span className=" text-gray-400 dark:text-">
                            {" "}
                            {interest}
                        </span>
                    </h1> */}
                    <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text- md:space-y-2 ">
                        {" "}
                        <div className="w-full">Balance (₦) </div>
                        <span className=" text-gray-400 dark:text-">
                            {" "}
                            {balance}
                        </span>
                    </h1>

                    <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text-  md:space-y-2">
                        <div className="w-full"> Tenor</div>

                        <div className="text-gray-400 dark:text-"> {tenor}</div>
                    </h1>

                    <h1 className="  flex flex-col md:justify-between text-14px text-primaryColor dark:text- md:space-y-2">
                        {" "}
                        <div className="w-full">Effectivate Date</div>
                        <div className="text-gray-400 dark:text- ">
                            {" "}
                            {effectivateDate}
                        </div>
                    </h1>

                    <h1 className="  flex flex-col md:justify-between text-14px text-primaryColor dark:text- md:space-y-2">
                        {" "}
                        <div className="w-full">Due Date</div>
                        <div className="text-gray-400 dark:text- ">
                            {" "}
                            {dueDate}
                        </div>
                    </h1>
                </div>
            </div>

            <div className="md:p-10 p-5 w-full  md:w-7/12 flex flex-col  space-y-3 bg-white rounded-md">
                <div className="flex justify-between mb-1">
                    <h1 className="text-base font-medium text-primaryColor ">
                        Days Left
                    </h1>
                    <h1 className="text-sm font-medium text-primaryColor ">
                        {progress.daysLeft} days
                    </h1>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                    <div
                        className={`bg-yellow-400 h-2.5 rounded-full transition-all duration-700 ease-in-out`}
                        style={{
                            maxWidth:
                                (
                                    (progress.daysPassed / progress.totalTime) *
                                    100
                                ).toString() + "%",
                        }}
                    ></div>
                </div>
            </div>

            <button
                className="btn1 float-right"
                onClick={() => {
                    navigate(paths.LOAN_PAYMENT_OPTIONS + "/" + id);
                }}
            >
                Repay Loan
            </button>
        </div>
    );
}

export default ActiveLoanDetails;
