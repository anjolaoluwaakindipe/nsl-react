import React from "react";

function StatusType({ status }: { status: Number }) {
    const PendingApproval = (
        <div className="flex  items-center  space-x-2">
            <div className="min-w-[10px] min-h-[10px]  bg-red-400 border-2 border-gray-10 rounded-full " />
            <h3 className="max-w-[200px]">Pending Approval {"      "} </h3>
        </div>
    );
    const PendingContractApproval = (
        <div className="flex items-center space-x-2">
            <div className="min-w-[10px] min-h-[10px] bg-red-900 border-2 border-gray-10 rounded-full " />
            <h3 >Pending Contract Approval</h3>
        </div>
    );

    switch (status) {
        case 1: {
            return PendingApproval;
        }

        case 2: {
            return PendingContractApproval;
        }

        default: {
            return PendingApproval;
        }
    }
}

export default StatusType;

//return status ? PendingContractApproval : PendingApproval;
