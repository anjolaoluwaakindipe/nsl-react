import React from "react";

function Information() {
    return (
        <form
            action="/"
            className="  w-full py-20 space-y-16 text-darkTextColor overflow-x-scroll"
        >
            <div className="md:p-10 p-5 w-full flex flex-col md:grid md:grid-cols-4 md:gap-20 bg-bgColor">
                <h1 className=" text-14px text-primaryColor dark:text- "> <div className="w-full">CSCS Account Number</div> 
                    <div className="text-gray-400 dark:text- "> 2392004900
                    </div>
                </h1>


                <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text-"> <div className="w-full">Amount</div> 
                    <div className=" text-gray-400 dark:text- ">  N493,903 </div>
                </h1>

                <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text- ">  <div className="w-full">Interest amount</div> 
                    <span className=" text-gray-400 dark:text-" > %59</span>
                </h1>

                <h1 className="flex flex-col md:justify-between text-14px text-primaryColor dark:text- "><div className="w-full">  Total</div>
                
                    <div className="text-gray-400 dark:text-" > N983,940</div>
                </h1>






            </div>

        </form>

    );
}


export default Information;