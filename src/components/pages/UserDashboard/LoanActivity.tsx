import React from "react";
import StatusDet from "./StatusDet";
import { Link } from 'react-router-dom';

function LoanActivity() {
    return (
        <form className="mt-10 md:p-10 p-5">
            <div className="md:p-10 p-5 w-full">
                <h3 className="md:text-justify font-bold">
                    Loan Requests

                    <Link to = "/loan-application">
                    <button
                        className="border flex  float-right text-right px-2   md:px-1 md:py-2 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        type="submit"
                    >
                        <div>+</div>
                        <div className="hidden md:block"> New Loan</div>

                    </button>
                    </Link>
                    
                </h3>
            </div>

            <div className="overflow-x-scroll md:overflow-auto w-full">
                <div className="space-y-5 pt-5  p-0 w-96 md:w-full text-sm md:text-md ">
                    <div className="md:p-10 p-2 w-full grid grid-cols-4 gap-20 bg-bgColor ">
                        <h3>Loan Type</h3>
                        <h3> Amount</h3>
                        <h3>Status </h3>
                        {}
                    </div>

                    <StatusDet />


                  


                </div>



            </div>

            <div className="p-10">
                <button className=" text-accentColor cursor-pointer float-right">
                    View All
                </button>
            </div>

        </form>
    );
}

export default LoanActivity;


//