import { useSelector } from "react-redux";
import { authSelector } from "../../../state/authSlice";
import { capitalize } from "../../../utils/stringFormatting";

function Header() {
    const { user } = useSelector(authSelector);

    return (
        <form className=" pb-10 px-5  md:px-10">
            <div>
                <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 md:items-center heading-info-1 pt-4 text-accentColor ">
                    <div className="flex w-full justify-between  font-semibold text-xl pt-5">
                        <div className="text-primaryColor text-xl md:text-2xl">
                            Welcome{" "}
                            {capitalize(user?.firstName!)}
                        </div>
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
