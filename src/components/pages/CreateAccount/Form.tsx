import React from "react";
import { Link } from "react-router-dom";

function Form() {
    return (
        <form
            action="/"
            className=" grid grid-cols-12 py-20 gap-x-0 md:gap-x-10 gap-y-14 md:gap-y-28 text-darkTextColor"
        >
            <div className="w-full md:col-span-6 col-span-12 border-0 border-b-2  border-underlineColor">
                <label htmlFor="cscsAccountNumber"></label>
                <input
                    type="text"
                    name="cscsAccountNumber"
                    id="CreateAccount__cscsAccountNumber"
                    className="outline-none pb-4  w-full"
                    placeholder="CSCS Account Number"
                />
            </div>
            <div className="md:col-span-6 col-span-12 border-0 border-b-2  border-underlineColor ">
                <label htmlFor="fullName"></label>
                <input
                    type="text"
                    name="fullName"
                    id="CreateAccount__fullName"
                    className="outline-none pb-4  border-0 "
                    placeholder="Full Name"
                />
            </div>
            <div className="md:col-span-6 col-span-12 border-0 border-b-2   border-underlineColor">
                <label htmlFor="email"></label>
                <input
                    type="email"
                    name="email"
                    id="CreateAccount__email"
                    className="outline-none pb-4  w-full"
                    placeholder="Email Address"
                />
            </div>
            <div className="md:col-span-6 col-span-12 border-0 border-b-2  border-underlineColor ">
                <label htmlFor="phoneNumber"></label>
                <input
                    type="number"
                    name="phoneNumber"
                    id="CreateAccount__phoneNumber"
                    className="outline-none pb-4   w-full"
                    placeholder="Phone Number"
                />
            </div>
            <div className="md:col-span-6 col-span-12 border-0 border-b-2  border-underlineColor ">
                <label htmlFor="bvn"></label>
                <input
                    type="number"
                    name="bvn"
                    id="CreateAccount__bvn"
                    className="outline-none pb-4  w-full"
                    placeholder="BVN"
                />
            </div>
            <div className="md:col-span-6 col-span-12 border-0 border-b-2  border-underlineColor">
                <label htmlFor="password"></label>
                <input
                    type="password"
                    name="password"
                    id="CreateAccount__password"
                    className="outline-none pb-4   w-full"
                    placeholder="Password"
                />
            </div>

            <div className="md:col-span-6 col-span-12 space-y-6">
                <button
                    className="w-full px-5 py-4 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-accentColor duration-100 ease-in-out transition-all"
                    type="submit"
                >
                    Proceed
                </button>
                <h6 className="text-center md:text-left">
                    Already have an account?{" "}
                    <span className="text-accentColor">
                        <Link to={"/"}>Sign in</Link>
                    </span>
                </h6>
            </div>
        </form>
    );
}

export default Form;
