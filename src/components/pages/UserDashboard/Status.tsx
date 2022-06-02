import React from "react";
//import StatusView from "./StatusView";
import { Link, Navigate } from 'react-router-dom';
import EmptyStatus from "./EmptyStatus"; 
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";

type StatusProp = {
    loantype: string;
    amount: string;
    statustype: number;
    statusview: number;
};







function Status(prop: StatusProp) {
    return (
        <div>
            <div className="md:p-10 p-5 w-full grid grid-cols-4 gap-20 bg-gradient-to-b from-white   to-yellow-100  ">
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

    const Approved =(
        <div className="flex items-center space-x-2">
        <div className="min-w-[10px] min-h-[10px] bg-green-600 border-2 border-gray-10 rounded-full " />
        <h3 >Approved</h3>


    </div>

    );

    switch (status) {
        case 1: {
            return (PendingApproval);
        }

        case 2: {
            return PendingContractApproval;
        }

        case 3:{
            return Approved;
        }

        default: {
            return PendingApproval;
        }
    }
}


//status view 
function StatusView ( { status }: { status: Number }){
    const navigate = useNavigate();
    const ViewPendingApproval = (
        <div>
            
                <button className=" text-accentColor cursor-pointer flex justify-center items-center"
                
                onClick={()=>{navigate(paths.LOAN_INFORMATION)}}
                >
                    view
                </button>
    
            
    
        </div>
    
    );

     
    const ViewPendingContractApproval = (
        <div>
            
                <button className=" text-accentColor cursor-pointer flex justify-center items-center"
                onClick={()=>{navigate(paths.LOAN_CONTRACT)}}
                >
                    view
                </button>
            
        </div>
    
    );


    const ViewApproved = (
        <div>
            <button className="text-accentColor cursor-pointer flex justify-center items-center"
            onClick={()=>{navigate(paths.TERM_LOAN)}}>
                View
            </button>
        </div>
    );

    switch (status) {
        case 1:{
            return (ViewPendingApproval);
        }
        case 2: {
            return (ViewPendingContractApproval);
        }
        case 3: {
            return ViewApproved;
        }
    
        default:
            return(ViewPendingApproval);
    }


}