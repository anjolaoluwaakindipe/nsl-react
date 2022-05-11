import React from "react";

function LoanActivity(){
    return(
        <form className="mt-10 md:p-10 p-5">
            <div className="md:p-10 p-5 w-full">
                    <h3 className="md:text-justify text-bold">
                        Loan Activities
                        <button  className="border  float-right text-right  px-10 py-2 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        type="submit">
                        Apply
                    </button>
                    </h3>
            </div>

            <div className="space-y-5 pt-5 text-sxm">
            <div className="md:p-10 p-5 w-full grid grid-cols-2 bg-bgColor">
                    <h3 className=" grid grid-rows-2 md:text-justify">
                        Loan Review
                        <span className="text-sm text-accentColor">
                            your loan is currently in review. check back to know if it's been granted
                        </span>
                    </h3>
                    <button className=" text-right text-accentColor hover:underline">
                        View details
                    </button>
                </div>

                <div className="md:p-10 p-5 w-full grid grid-cols-2 bg-bgColor">
                    <h3 className=" grid grid-rows-2 md:text-justify">
                        Loan Contract
                        <span className="text-sm text-accentColor">
                            This contains the details of your loan contract
                        </span>
                    </h3>
                    <button className="text-right text-accentColor hover:underline">
                        View details
                    </button>
                </div>

            </div>


        </form>

    );
}


export default LoanActivity;