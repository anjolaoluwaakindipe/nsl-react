import React from "react";
import { useNavigate } from 'react-router-dom';
import { paths } from "../../../../utils/constants/allPaths";

function ProfileUpdateModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const onProceed = () =>{
        
        prop.cancelModal()
        navigate(paths.UPDATE_PROFILE.base + paths.UPDATE_PROFILE.PERSONAL_DETAILS, {replace:true})
    }
    return (
        <div className="w-full h-full flex flex-col items-center sm:py-10 md:pt-20 justify-center">
            <img
                src="assets/updateprofile.svg"
                alt="updateprofile_img"
                className="object-contain md:w-42 w-16"
            />
            <h3 className="pt-5 text-2xl md:text-4xl font-bold text-primaryColor">
                Profile Update
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-2xl md:py-20 py-10">
            You are required to update your profile before you make any Loan request
            </h5>

            <button className="btn1 md:w-96 w-44" onClick={onProceed}>Proceed</button>
        </div>
    );
}

export default ProfileUpdateModal;
