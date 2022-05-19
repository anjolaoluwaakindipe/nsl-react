import React from "react";
import StatusType from "./StatusType";

type StatusProp = {
    loantype: string;
    amount: string;
    status: number;
    view: string;
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
                <StatusType status={prop.status} />
            </div>

            <button className=" text-accentColor cursor-pointer flex justify-center items-center">
                {prop.view}
            </button>
        </div>
    );
}

export default Status;
