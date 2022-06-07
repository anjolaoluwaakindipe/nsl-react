import React from "react";


function LoanActivity() {
    return (
        <form className="mt-10 md:p-10 p-5 bg-white rounded-sm">
            <div className=" flex ">
                <label
                    htmlFor="TotalAdminDashboard__search"
                    className=" w-full flex h-14 rounded-l-lg rounded-r-lg md:rounded-r-none overflow-hidden bg-bgColor2 p-0"
                >
                    <input
                        id="TotalAdminDashboard__search"
                        type="search"
                        className="w-full bg-transparent p-2.5 text-sm text-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-500 "
                        placeholder="Search"
                    ></input>
                    <button
                        type="submit"
                        className=" px-5 text-sm font-medium text-darkTextColor bg-accentColor border border-gray-300  focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 h-full"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </button>
                </label>
            </div>

            <div className="pt-10">
                <h1 className="pt-8 text-2xl font-bold text-darkTextColor">
                    {" "}
                    Loan Activity
                </h1>
                <h1 className="pt-8 text-accentColor">
                    {" "}
                    This shows the list of loan applications, reviwed loan,
                    disbursed loan, Loan Repayed and Declined Loan.
                </h1>
            </div>

            <div className="md:pt-8 text-xs flex md:flex-row  gap-4 md:justify-between flex-col-reverse">
                <div className=" md:space-x-4">
                    <button
                        className="border  text-center    px-3 py-2  bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        type="submit"
                    >
                        All
                    </button>

                    <button
                        className="border  text-center  px-3 py-2  bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        type="submit"
                    >
                        Loan Application
                    </button>

                    <button
                        className="bordertext-center  px-3 py-2  bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        type="submit"
                    >
                        Reviewed Loans
                    </button>

                    <button
                        className="border  text-center  px-3 py-2   bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        type="submit"
                    >
                        Disbursed Loans
                    </button>

                    <button
                        className="border  text-center  px-3 py-2  bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        type="submit"
                    >
                        Declined Loans
                    </button>

                    <button
                        className="border  text-center  px-3 py-2  bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        type="submit"
                    >
                        Loan Repayed
                    </button>
                </div>

                <button
                    className=" float-right  text-right  px-3 py-2   text-accentColor cursor-pointer ml-10 "
                    type="submit"
                >
                    View All
                </button>
            </div>

            <div className="space-y-5 pt-10  text-sm ">
                <div className="md:p-10 p-5 w-full grid grid-cols-2 bg-bgColor">
                    <h3 className=" grid grid-rows-2 md:text-justify">
                        Amadu Barrack applied for Loan
                        <span className="text-sm text-accentColor">
                            2 months ago
                        </span>
                    </h3>
                    <button className="font-bold text-right hover:underline">
                        View details
                    </button>
                </div>

                <div className="md:p-10 p-5 w-full grid grid-cols-2 bg-bgColor">
                    <h3 className=" grid grid-rows-2 md:text-justify">
                        Amadu Barrack applied for Loan
                        <span className="text-sm text-accentColor">
                            2 months ago
                        </span>
                    </h3>
                    <button className="font-bold text-right hover:underline">
                        View details
                    </button>
                </div>
                
                <div className="md:p-10 p-5 w-full grid grid-cols-2 bg-bgColor">
                    <h3 className=" grid grid-rows-2 md:text-justify">
                        Amadu Barrack applied for Loan
                        <span className="text-sm text-accentColor">
                            2 months ago
                        </span>
                    </h3>
                    <button className="font-bold text-right hover:underline">
                        View details
                    </button>
                </div>

            </div>
        </form>
    );

}

export default LoanActivity;