import React from "react";
import { useNavigate } from 'react-router-dom';

function PhoneEmailVerificationSuccessModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const onProceed = () =>{
        
        prop.cancelModal()
        navigate("/dashboard", {replace:true})
    }
    return (
        <div className="w-full h-full flex flex-col items-center sm:py-10 md:pt-20 justify-center">
            <img
                src="assets/successtick.svg"
                alt="success_img"
                className="object-contain md:w-52 w-16"
            />
            <h3 className="pt-5 text-2xl md:text-4xl font-bold text-primaryColor">
                Successful
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-2xl md:py-20 py-10">
                You have successfully verified your account proceed to go to
                your Dashboard
            </h5>

            <button className="btn1 md:w-96 w-44" onClick={onProceed}>Proceed</button>
        </div>
    );
}

export default PhoneEmailVerificationSuccessModal;