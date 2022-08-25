import React from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../../state/redux/authSlice';

function Header() {
    const user = useSelector(authSelector).user
    return (
        <form>
            <div className="space-y-5 pt-10 ">
                <h1 className="heading1 text-primaryColor dark:">
                    Loan Information
                </h1>
            </div>

            <div className="pt-8 py-10 space-y-2">
                <h3 className="font-bold text-justify text-accentColor dark:">
                    {`${user?.lastName?.toLocaleUpperCase()} ${user?.firstName?.toLocaleUpperCase()} ${user?.middleName?.toLocaleUpperCase()}`}
                </h3>

                <div>
                    <span className="bg-primaryColor text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:">
                        {" "}
                        Status
                    </span>
                    <span className="font-sm dark:">Pending Approval</span>
                </div>
            </div>
        </form>
    );
}

export default Header