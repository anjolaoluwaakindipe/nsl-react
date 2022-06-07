import React from "react";
import { useNavigate } from "react-router-dom";

function PhoneEmailVerificationSuccessModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const onProceed = () => {
        prop.cancelModal();
        navigate("/login", { replace: true });
    };
    return (
        <div className="bg-white w-24 h-full flex flex-col items-center sm:py-10 md:pt-20 justify-center">
            <img
                src="assets/successtick.svg"
                alt="success_img"
                className="object-contain md:w-42 w-16"
            />
            <h3 className="pt-5 text-xl md:text-2xl font-bold text-primaryColor">
                Account Successfully Created
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-xl md:py-20 py-10">
                You have successfully verified your phone number. Proceed to
                access your Account
            </h5>

            <button className="btn1 md:w-96 w-44" onClick={onProceed}>
                Proceed
            </button>
        </div>
    );
}

export default PhoneEmailVerificationSuccessModal;
