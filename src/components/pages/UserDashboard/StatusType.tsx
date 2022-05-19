import React from "react";
import Status from "./Status";


function StatusType({ status }: { status: Number }) {
    const PendingApproval = (
        <div>
            <h3 className="flex justify">
                <div className="flex justify-between">
                    <div className="  w-3.5 h-3.5  bg-red-400 border-2 border-gray-10 rounded-full " />
                    <h3>Pending Approval </h3>
                    <div />
                </div>

            </h3>
        </div>
    )
    const PendingContractApproval = (
        <div>
            <h3 className="flex justify-between">
                <div className="flex justify-between">
                    <div className="bottom-1   w-3.5 h-3.5 bg-red-900 border-2 border-gray-10 rounded-full " />
                    <h3>Pending Contract Approval</h3>
                </div>
            </h3>
        </div>
    )

    switch (status) {
        case 1:{
            return PendingApproval;
        }
            
        case 2: {
            return PendingContractApproval;
        }

        default:{
            return PendingApproval;
        }
    
      
    }


    
}



export default StatusType;


//return status ? PendingContractApproval : PendingApproval;
