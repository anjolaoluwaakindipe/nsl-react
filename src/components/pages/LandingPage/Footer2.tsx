import React from "react";


function Footer2() {
    return (
        <div className=" bg-white w-full p-10">
            <div className="text-gray-500 flex flex-col md:flex-row  items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                <h1>Newsletter</h1>

        
                <div className="bg-peach border  text-gray-900 text-sm rounded-full focus:ring-contColor focus:border-contColor w-3/4  md:w-2/6 px-5 p-2.5 flex space-x-3">
                    <input
                        type="email"
                        id="email-address-icon"
                        className=" bg-transparent w-full"
                        placeholder="Your email"
                    />
                    
                        <img
                            className="w-5 h-5 text-gray-500 cursor-pointer"
                            src="/assets/sendicon.svg"
                            alt="email_icon"
                            onClick={() => {}}
                        />
                   
                </div>
            </div>

            <div className="relative"></div>
        </div>
    );
}


export default Footer2;