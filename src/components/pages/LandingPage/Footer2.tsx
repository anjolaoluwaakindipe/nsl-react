import React from "react";


function Footer2() {
    return (
        <div className="relative text-center bg-white w-full p-10">

            <div className="text-gray-500">
                Newsletter 
                {"            "}
                <input type="text"
                    id="email-address-icon"
                    className="bg-peach border  text-gray-900 text-sm rounded-full focus:ring-contColor focus:border-contColor  w-40 pl-5 p-2.5"
                    placeholder="Your email" />
                    <div className="absolute  inset-y-0 right-[400px] flex items-center pl-3 cursor-pointer">
                    <img className="w-5 h-5 text-gray-500 "
                        src="/assets/sendicon.svg"
                        onClick={()=>{}}
                    />

                </div>
            </div>

            <div className="relative">
                
              
            </div>
        </div>
    )
}


export default Footer2;