import React from "react";

function LoanProcess(){
    return (
        <div className="relative pt-6 bg-peach">
            <div className="text-primaryColor text-center font-light text-4xl">
                Loan Process
            </div>

            <div className="w-full flex items-center justify-center">
                <img
                    src="/assets/loanprocess.svg"
                    className="px-10 pb-10 py-10 "
                    alt="loan_process_image"
                />
            </div>
        </div>
    );
}

export default LoanProcess;