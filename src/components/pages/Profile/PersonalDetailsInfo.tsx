import { useSelector } from 'react-redux';
import { authSelector } from "../../../state/redux/authSlice";

function PersonalDetailsInfo() {
    const {user} = useSelector(authSelector)
    return (
        <div className="col-span-1 space-y-6">
            <div className="w-full flex justify-between items-end">
                <h1 className="font-semibold">Personal Details</h1>

                {/* <AiFillEdit
                    className="cursor-pointer text-primaryColor brightness-125"
                    onClick={() => {
                        navigate(paths.EDIT_PERSONAL_DETAILS);
                    }}
                /> */}
            </div>

            <div className="grid grid-cols-2 p-6 bg-white text-sm rounded-md gap-y-8 max-w-full">
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold ">
                        Email Address
                    </h1>
                    <p className="break-words">{user?.email}</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Phone Number
                    </h1>
                    <p className="break-words">{user?.phoneNumber}</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Marital Status
                    </h1>
                    <p className="break-words">{user?.maritalStatus}</p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        CSCS Number
                    </h1>
                    <p className="break-words">{user?.cscsNumber}</p>
                </div>
                {/* <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        NIN Number
                    </h1>
                    <p>{}</p>
                </div> */}
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">BVN </h1>
                    <p>
                        {user?.bvn}
                    </p>
                </div>
                <div className="md:col-span-1 col-span-2 space-y-1">
                    <h1 className="text-primaryColor font-semibold">
                        Residential Address
                    </h1>
                    <p className="break-words">
                        {user?.residentialAddress}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PersonalDetailsInfo;
