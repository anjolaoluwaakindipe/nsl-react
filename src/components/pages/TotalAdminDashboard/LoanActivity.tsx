import React from "react";

function LoanActivity() {
    return (
        <form>
            <div className="pt-20 flex">
                <div className="relative w-full">
                    <input type="search" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-500"
                        placeholder="Search" >
                    </input>
                    <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-darkTextColor bg-accentColor rounded-r-lg border border-gray-300  focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>



            <div>
                <h1 className="pt-8 text-xl  text-darkTextColor"> Loan Activity</h1>
                <h1 className="pt-8 text-accentColor"> This shows thevlist of loan applications, reviwed loan, disbursed loan, Loan Repayed and Declined Loan.</h1>


            </div>

            <div className=" pt-8 pd-10 text-xs flex flex-row  gap-4 ">
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

                <button
                    className=" float-right  text-right  px-3 py-2   text-accentColor cursor-pointer "
                    type="submit"
                >
                    View All
                </button>

            </div>

            <div className="space-y-5 pt-10 overscroll-none ">

                <div className="p-10 w-full grid grid-cols-2 bg-bgColor">
                    <h3 className=' grid grid-rows-2 text-justify'>
                        Amadu Barrack applied for Loan
                        <span className="text-sm text-accentColor">
                            2 months ago
                        </span>
                    </h3>
                    <button className='font-bold text-right'>
                        View details
                    </button>
                </div>


                <div className="p-10 w-full grid grid-cols-2 bg-bgColor">
                    <h3 className=' grid grid-rows-2 text-justify'>
                        Amadu Barrack applied for Loan
                        <span className="text-sm text-accentColor">
                            2 months ago
                        </span>
                    </h3>
                    <button className='font-bold text-right'>
                        View details
                    </button>
                </div>


                <div className="p-10 w-full grid grid-cols-2 bg-bgColor">
                    <h3 className=' grid grid-rows-2 text-justify'>
                        Amadu Barrack applied for Loan
                        <span className="text-sm text-accentColor">
                            2 months ago
                        </span>
                    </h3>
                    <button className='font-bold text-right'>
                        View details
                    </button>
                </div>


            </div>

        </form>





    );

}

export default LoanActivity;