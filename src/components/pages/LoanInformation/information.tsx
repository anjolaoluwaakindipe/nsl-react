import React from "react";

function Information() {
    return (
        <form
            action="/"
            className="  w-full py-20 space-y-16text-darkTextColor"
        >
            <div className="space-y-5 pt-10 ">
                <h1 className="heading1 text-primaryColor">Loan Description </h1>
            </div>

            <div className=" grid grid-cols-4 gap-20 pt-8  border-b-2  border-underlineColor ">

                <h1 className="font-bold text-14px text-primaryColor text-justify"> Principal</h1>
                <h1 className="font-bold  text-14px text-primaryColor text-center"> Interest rate </h1>
                <h1 className="font-bold text-14px text-primaryColor text-center"> Interest amount</h1>
                <h1 className="font-bold text-14px text-primaryColor text-right"> Total</h1>
            </div>
            <div className="grid grid-cols-4 pt-4 gap-20 ">
            
            <h1 className="font-bold text-14px text-darkTextColor text-justify"> N500,000</h1>
            <h1 className="font-bold  text-14px text-darkTextColor text-center"> 15%</h1>
            <h1 className="font-bold text-14px text-darkTextColor text-center"> N75,000</h1>
            <h1 className="font-bold text-14px text-darkTextColor text-right"> N575,000</h1>
            </div>
            
        </form>

    );
}




export default Information;