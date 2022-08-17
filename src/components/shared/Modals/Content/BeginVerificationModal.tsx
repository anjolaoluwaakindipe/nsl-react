import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../utils/constants/allPaths";

function BeginVerificationModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const onProceed: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        navigate(paths.PHONE_VERIFICATION);
        prop.cancelModal();
    };
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <h2 className="text-xl md:text-2xl font-bold text-center w-full">
                You are 2 steps away from creating your online profile
            </h2>
            <p className="md:text-xl font-light text-center pt-4 pb-6">
                A <span className="font-bold text-primaryColor"> FOUR (4)</span> digit code has been sent to your email address and phone
                number for verification.
            </p>
            <button
                className="md:text-xl py-5 px-4 bg-secondaryColor w-full rounded-xl"
                onClick={onProceed}
            >
                Proceed
            </button>
        </div>
    );
}

export default BeginVerificationModal;
