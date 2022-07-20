import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../utils/constants/allPaths";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../state/authSlice";

function LoginSuccessModal(prop: { cancelModal: () => void }) {
    const { rfStatus } = useSelector(authSelector).user!;
    const navigate = useNavigate();
    const onProceed = () => {
        prop.cancelModal();
        if (rfStatus === "Processed") {
            navigate(paths.USER_DASHBOARD, { replace: true });
        }
        if (rfStatus === "New") {
            navigate(paths.WAITING, {
                replace: true,
            });
        } else {
            navigate(paths.WELCOME, {
                replace: true,
            });
        }
    };

    const info = () => {
        if (rfStatus === "Processed") {
            return "Welcome to your Dashboard";
        } else {
            return "Let's get you started";
        }
    };

    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <img
                src="assets/successtick.svg"
                alt="success_img"
                className="object-contain md:w-20 w-16 mx-auto"
            />
            <h3 className="pt-5 text-2xl md:text-4xl font-bold text-primaryColor text-center">
                Login Sucessful!
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-2xl  py-10">
                {info()}
            </h5>

            <button className="btn1 w-full" onClick={onProceed}>
                Proceed
            </button>
        </div>
    );
}

export default LoginSuccessModal;
