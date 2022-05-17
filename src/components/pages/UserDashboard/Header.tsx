import React from "react"

function Header() {
    return (
        <form className=" py-10 px-5  md:px-10">
            
            <div >
                <h1 className=" heading1 text-accentColor">Dashboard</h1>
                <h1 className=" heading-info-1 pt-4 text-accentColor " > Welcome USER
                    <span className="flex float-right">
                        <div className="flex items-center flex-right">
                            <div className="flex">
                                <div className="relative text-gray-600 focus-within:text-gray-400">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <button type="submit"
                                            className="p-1 focus:outline-none focus:shadow-outline">
                                            <svg fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                className="w-6 h-6">
                                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                ></path>
                                            </svg>
                                        </button>
                                    </span>
                                    <input
                                        type="search"
                                        name="q"
                                        className="py-2 text-sm text-white bg-white rounded-md pl-10 focus:outline-none focus:text-gray-900"
                                        placeholder="Search..."></input>
                                </div>
                            </div>
                        </div>
                    </span>
                </h1>

            </div>
        </form>
    );
}

export default Header