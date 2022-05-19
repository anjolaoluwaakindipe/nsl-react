import React from "react";
import Status from "./Status";
import StatusType from "./StatusType";


function StatusDet() {
    return (
        
        <div className="overflow-x-scroll md:overflow-auto w-full">
            <div className="space-y-5  p-0 w-96 md:w-full text-sm md:text-md">
                <Status loantype="Land Loan" amount="900,000" status={1} view="view" />

                <Status loantype="School Loan" amount="900,000" status={2} view="view" />


            </div>

        </div>

    );
}

export default StatusDet;