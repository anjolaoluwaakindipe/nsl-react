import React from "react";
//import StatusView from "./StatusView";
import { Link } from 'react-router-dom';

type StatusProp = {
    loantype: string;
    amount: string;
    statustype: number;
    statusview: number;
};







function Status(prop: StatusProp) {
    return (
        <div className="md:p-10 p-5 w-full grid grid-cols-4 gap-20 bg-gray-300 ">
            <h3 className="flex justify-center items-center">
                {prop.loantype}
            </h3>

            <h3 className=" flex justify-center  items-center">
                {prop.amount}
            </h3>

            <div className="">
                <StatusType status={prop.statustype} />
            </div>

            <div className="flex justify-center items-center"> 
               <StatusView status={prop.statusview} /> 
            </div>



        </div>
    );
}

export default Status;



//status type
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

    const ViewPendingApproval = (
        <div>
            <Link to="/loan-information">
                <button className=" text-accentColor cursor-pointer flex justify-center items-center">
                    view
                </button>
    
            </Link>
    
        </div>
    
    );

    switch (status) {
        case 1: {
            return (PendingApproval);
        }

        case 2: {
            return PendingContractApproval;
        }

        default: {
            return PendingApproval;
        }
    }
}


//status view 
function StatusView ( { status }: { status: Number }){
    const ViewPendingApproval = (
        <div>
            <Link to="/loan-information">
                <button className=" text-accentColor cursor-pointer flex justify-center items-center">
                    view
                </button>
    
            </Link>
    
        </div>
    
    );

     
    const ViewPendingContractApproval = (
        <div>
            <Link to="/loan-contract">
                <button className=" text-accentColor cursor-pointer flex justify-center items-center">
                    view
                </button>
            </Link>
        </div>
    
    );

    switch (status) {
        case 1:{
            return (ViewPendingApproval);
        }
        case 2: {
            return (ViewPendingContractApproval);
        }
    
        default:
            return(ViewPendingApproval);
    }


}