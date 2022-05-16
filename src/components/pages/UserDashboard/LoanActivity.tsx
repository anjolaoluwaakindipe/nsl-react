import React from "react";

function LoanActivity() {
    return (
        <form className="mt-10 md:p-10 p-5">
            <div className="md:p-10 p-5 w-full">
                <h3 className="md:text-justify font-bold">
                    Loan Requests
                    <button
                        className="border  float-right text-right  px-10 py-2 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        type="submit"
                    >
                        + New Loan
                    </button>
                </h3>
            </div>

            <div className="space-y-5 pt-3 text-sm md:text-md">
                <div className="md:p-10 p-2 w-full grid grid-cols-4 gap-20 bg-bgColor ">
                    <h3>Loan Type</h3>
                    <h3> Amount</h3>
                    <h3>Status </h3>
                    <button className=" text-accentColor cursor-pointer ">
                        View
                    </button>
                </div>


                <div className="md:p-10 p-2 w-full grid grid-cols-4 gap-20 bg-gray-300 ">
                    <h3>Term Loan</h3>
                    <h3> 900,000</h3>
                    <div className="relative">
                        <h3>Pending Approval
                            <span className=" bottom-1 right-12 absolute  w-3.5 h-3.5 bg-red-400 border-2 border-gray-10 rounded-full " />
                        </h3>
                    </div>
                    <button className=" text-accentColor cursor-pointer">
                        View
                    </button>

                </div>

                <div className="md:p-10 p-2 w-full grid grid-cols-4 gap-20 bg-gray-300 ">
                    <h3>Land Loan</h3>
                    <h3> 900,000</h3>
                    <div className="relative">
                        <h3>Pending Contract Approval
                            <span className="bottom-1 right-12 absolute  w-3.5 h-3.5 bg-red-900 border-2 border-gray-10 rounded-full " />
                        </h3>
                    </div>
                    <button className=" text-accentColor cursor-pointer">
                        View
                    </button>

                </div>

                <div className="md:p-10 p-2 w-full grid grid-cols-4 gap-20 bg-gray-300 ">
                    <h3>School Loan</h3>
                    <h3> 900,000</h3>
                    <div className="relative">
                        <h3>Approved
                            <span className=" bottom-1 left-30 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-gray-10 rounded-full  " />
                        </h3>
                    </div>
                    <button className=" text-accentColor cursor-pointer">
                        View
                    </button>
                </div>

                <div className="p-10">
                    <button className=" text-accentColor cursor-pointer float-right">
                        View All
                    </button>
                </div>

            </div>
        </form>
    );
}

export default LoanActivity;


//