import React from "react";


function ZeroState() {
    return (
        <div className="bg-white relative">
            <div className="p-10 md:w-[800px]">
                Based on your portfolio evalution, you are eligible to a maximum loan amount of N 500,000.
                The principal and interest shall be rolled over at maturity at the prevailing terms and conditions,
                if the principal and accrued interest are not received at maturity.
                Rolled over will not be more than once.

                <p className="pt-5">
                    Note: The loan will range from 30 days – 90 days
                </p>
            </div>


            <div className="md:p-10 ">
                    <button className=" btn1 items-center md:px-15 md:py-5">
                        Apply for Loan
                    </button>
                </div>

            <img
                src="/assets/discuss.svg"
                className=" absolute float-right  top-[1px] left-[50px] w-full h-[400px]"
            />

        </div>
    )
}


export default ZeroState;