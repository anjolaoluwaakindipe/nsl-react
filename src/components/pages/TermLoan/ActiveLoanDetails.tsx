import React, { useState } from "react";

function ActiveLoanDetails() {
    const [progress, setProgress] = useState("0%");


    const onClickFunc:React.FormEventHandler = (e)=>{
        e.preventDefault();
        setProgress("90%")
    }

    return (
        <form
            action="/"
            className="  w-full py-20 space-y-16 text-darkTextColor "
        >
            <div className="w-full bg-white p-5 md:p-10 text-sm rounded-md space-y-5">
                <h1 className=" text-14px text-primaryColor dark:text- flex flex-col md:grid md:grid-cols-6  ">
                    <div className="md:space-y-2">
                        <div className="w-full">CSCS Account Number</div>
                        <div className="text-gray-400 dark:text- ">
                            2392004900
                        </div>
                    </div>
                </h1>
                <div className="border-solid w-full h-[1px] bg-gray-300" />

                <div className=" w-full flex flex-col md:grid md:grid-cols-6 md:gap-20 space-y-4 md:space-y-0">
                    <h1 className=" text-14px text-primaryColor dark:text-  md:space-y-2">
                        {" "}
                        <div className="w-full">Total Loan Repayment</div>
                        <div className="text-gray-400 dark:text- ">
                            {" "}
                            2392004900
                        </div>
                    </h1>

                    <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text-">
                        {" "}
                        <div className="w-full">Loan Amount</div>
                        <div className=" text-gray-400 dark:text- ">
                            {" "}
                            N493,903{" "}
                        </div>
                    </h1>

                    <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text- md:space-y-2 ">
                        {" "}
                        <div className="w-full">Interest </div>
                        <span className=" text-gray-400 dark:text-"> %59</span>
                    </h1>

                    <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text-  md:space-y-2">
                        <div className="w-full"> Tenor</div>

                        <div className="text-gray-400 dark:text-">
                            {" "}
                            N983,940
                        </div>
                    </h1>

                    <h1 className="  flex flex-col md:justify-between text-14px text-primaryColor dark:text- md:space-y-2">
                        {" "}
                        <div className="w-full">Effective</div>
                        <div className="text-gray-400 dark:text- ">
                            {" "}
                            2392004900
                        </div>
                    </h1>

                    <h1 className="  flex flex-col md:justify-between text-14px text-primaryColor dark:text- md:space-y-2">
                        {" "}
                        <div className="w-full">Due Date</div>
                        <div className="text-gray-400 dark:text- ">
                            {" "}
                            2392004900
                        </div>
                    </h1>
                </div>
            </div>

            <div className="md:p-10 p-5 w-full  md:w-7/12 flex flex-col  space-y-3 bg-white rounded-md">
                <div className="flex justify-between mb-1">
                    <h1 className="text-base font-medium text-primaryColor dark:text-white">
                        Days Left
                    </h1>
                    <h1 className="text-sm font-medium text-primaryColor dark:text-white">
                        40 days
                    </h1>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                        className={`bg-yellow-400 h-2.5 rounded-full transition-all duration-700 ease-in-out`}
                        style={{ maxWidth: progress }}
                    ></div>
                </div>
            </div>
        </form>
    );
}

export default ActiveLoanDetails;
