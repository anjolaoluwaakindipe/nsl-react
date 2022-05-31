import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { useEffect, useState } from "react";

function Header() {
    const [name, setName] = useState("");
    const { keycloak } = useKeycloak();
    useEffect(() => {
        keycloak.loadUserInfo().then((data: Record<string, any>) => {
            setName(data.given_name);
        });
    }, [keycloak]);

    return (
        <form className=" py-10 px-5  md:px-10">
            <div>
                <h1 className=" heading1 text-primaryColor">Dashboard</h1>
                <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 md:items-center heading-info-1 pt-4 text-accentColor ">
                    <div className="flex w-full justify-between  font-semibold text-xl pt-5">
                        <div>Welcome {name}</div>
                    </div>

                    {/* <div className="flex items-center bg-white text-gray-600 focus-within:text-gray-400 rounded-md overflow-hidden ">
                        <span className=" pl-2">
                            <button
                                type="submit"
                                className="p-1 focus:outline-none focus:shadow-outline"
                            >
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    ></path>
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="q"
                            className="py-2 text-sm text-white  px-2 focus:outline-none focus:text-gray-900"
                            placeholder="Search..."
                        ></input>
                    </div> */}
                </div>
            </div>
        </form>
    );
}

export default Header;
