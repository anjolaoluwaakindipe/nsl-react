import React from "react";

function Information() {
    return (
        <div className="  w-full py-20 space-y-16 text-darkTextColor ">
            <div className="md:p-10 p-5 w-full flex flex-col md:grid md:grid-cols-4 md:gap-20 bg-bgColor text-sm space-y-4 md:space-y-0">
                <div className=" text-14px text-primaryColor dark:text- space-y-2">
                    {" "}
                    <div className="w-full font-semibold ">
                        CSCS Account Number
                    </div>
                    <div className="text-gray-400 dark:text- "> 2392004900</div>
                </div>

                <div className="flex flex-col md:justify-between  text-primaryColor dark:text- space-y-2">
                    <div className="w-full font-semibold">Amount</div>
                    <div className=" text-gray-400 dark:text- "> N493,903 </div>
                </div>

                <div className="flex flex-col md:justify-between text-primaryColor dark:text- space-y-2">
                    {" "}
                    <div className="w-full font-semibold">Interest amount</div>
                    <span className=" text-gray-400 dark:text-"> %59</span>
                </div>

                <div className="flex flex-col md:justify-between text-primaryColor dark:text- space-y-2">
                    <div className="w-full font-semibold"> Total</div>

                    <div className="text-gray-400 dark:text-"> N983,940</div>
                </div>
            </div>
        </div>
    );
}


export default Information;