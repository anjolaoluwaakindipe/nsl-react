import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthState } from "../../../../state/authSlice";
import { AppDispatch } from "../../../../state/store";
import { paths } from "../../../../utils/constants/allPaths";

function LogOutModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const onProceed: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        dispatch(clearAuthState());
        prop.cancelModal();
        navigate(paths.LOGIN);
    };
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <h3 className="pt-5 text-2xl md:text-4xl text-center font-bold text-primaryColor">
                Log Out
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-xl  py-10">
                Are you sure you wish to Logout?
            </h5>
            <button
                className="md:text-xl py-5 px-5 bg-accentColor w-30 rounded-xl text-white"
                onClick={prop.cancelModal}
            >
                Cancel
            </button>

            <button
                className="md:text-xl py-5 px-4 bg-secondaryColor w-30 rounded-xl float-right"
                onClick={onProceed}
            >
                Proceed
            </button>
        </div>
    );
}

export default LogOutModal;
