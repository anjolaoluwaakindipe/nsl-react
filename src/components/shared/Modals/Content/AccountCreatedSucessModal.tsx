import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../utils/constants/allPaths";

function AccountCreatedSuccessModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const onProceed = () => {
        prop.cancelModal();
        navigate(paths.EMAIL_VERIFICATION, { replace: true });
    };
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <img
                src="assets/successtick.svg"
                alt="success_img"
                className="object-contain md:w-52 w-16"
            />
            <h3 className="pt-5 text-center text-2xl md:text-4xl font-bold text-primaryColor">
                Account Created Successful
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-2xl md:py-20 py-10">
                Check your email address and phone number for your 4 digits code
                for verification.
            </h5>

            <button className="btn1 md:w-96 w-44" onClick={onProceed}>
                Proceed
            </button>
        </div>
    );
}

export default AccountCreatedSuccessModal;
