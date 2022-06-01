import React from "react";
import StatusDet from "./StatusDet";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";

function LoanActivity() {
    const navigate = useNavigate();
    return (
        <form className="mt-10 md:p-10 p-5">
            <div className="lg:px-10 pb-3 w-full">
                <h3 className="md:text-justify font-bold">
                    Loan Requests

                    
                    <button
                        className="border flex  float-right text-right px-2   md:px-2 md:py-2 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-darkTextColor duration-100 ease-in-out transition-all"
                        onClick={()=>{navigate(paths.LOAN_APPLICATION)}}
                        type="submit"
                    >
                        <div>+</div>
                        <div className="hidden md:block pl-2"> New Loan</div>
                    </button>
                    
                    
                </h3>
            </div>

            <div className="overflow-x-scroll md:overflow-auto w-full">
                <div className="space-y-5 pt-5  p-0 w-[600px] sm:w-full text-sm md:text-md ">
                    <div className="md:p-10 p-5 w-full grid grid-cols-4 gap-20 bg-white font-semibold text-primaryColor ">
                        <h3 className="text-center">Loan Type</h3>
                        <h3 className="text-center"> Amount</h3>
                        <h3 className="text-center">Status </h3>
                        <h3 className="text-center">View</h3>
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
