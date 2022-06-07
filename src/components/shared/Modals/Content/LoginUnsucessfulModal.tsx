import React from "react";
import { useNavigate } from 'react-router-dom';

function LoginUnsuccessfulModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const onProceed = () =>{
        
        prop.cancelModal()
        navigate("/login", {replace:true})
    }
    return (
        <div className="w-full h-full flex flex-col items-center sm:py-10 md:pt-20 justify-center">
            <img
                src="assets/unsuccessfulcross.svg"
                alt="unsuccessful_img"
                className="object-contain md:w-42 w-16"
            />
            <h3 className="pt-5 text-2xl md:text-4xl font-bold text-primaryColor">
                Login Failed
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-2xl md:py-20 py-10">
            Please input the correct details to login to your dashboard
            </h5>

            <button className="btn1 md:w-96 w-44" onClick={onProceed}>Proceed</button>
        </div>
    );
}

export default LoginUnsuccessfulModal;
