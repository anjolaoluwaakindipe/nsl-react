import React from "react";
import LoanApplicationGraph from "./LoanApplicationGraph";
import LoanPerformanceGraph from "./LoanPerformanceGraph";

function GraphSection() {
    return (
        <div className="p-5 md:p-10 bg-white mt-10 flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="md:w-3/4 w-full h-96">
                <LoanPerformanceGraph />
            </div>

            <div className="flex flex-row md:flex-col md:justify-between  md:w-1/4 w-full ">
                <div className="w-1/2 md:w-full">
                    <LoanApplicationGraph />
                </div>
                <div className="w-1/2 md:w-full">
                    <LoanApplicationGraph />
                </div>
            </div>
        </div>
    );
}

export default GraphSection;
