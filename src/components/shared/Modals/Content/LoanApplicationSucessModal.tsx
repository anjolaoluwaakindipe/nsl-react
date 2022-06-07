import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../utils/constants/allPaths";

function LoanApplicationSuccessModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const onProceed = () => {
        prop.cancelModal();
        navigate(paths.USER_DASHBOARD, { replace: true });
    };
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <img
                src="assets/successtick.svg"
                alt="success_img"
                className="object-contain md:w-20 w-16 md:mx-auto"
            />
            <h3 className="pt-5 text-center text-2xl md:text-xl font-bold text-primaryColor">
                Loan Application Successful
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-2xl md:py-10 py-10">
            Your Loan application has been submitted successfully, 
            please give us some time while we review your application.
            </h5>

            <button className="btn1 md:w-full w-full" onClick={onProceed}>
                Proceed
            </button>
        </div>
    );
}

export default LoanApplicationSuccessModal;
