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
        <div className="m-10 md:w-full h-62 bg-white p-10 rounded-xl">
            <img
                src="assets/updateprofile.svg"
                alt="updateprofile_img"
                className="object-contain md:w-12 w-16 md:float-left"
            />
            <h3 className="pt-5 md:py-5 text-xl md:text-xl font-bold text-primaryColor">
                Profile Update

            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-sm md:py-5 py-10">
            You are required to update your profile before you make any Loan request
            </h5>

            <button className="btn1 md:w-76 w-44 md:float-right md:h-10 md:text-center" onClick={onProceed}>Proceed</button> 
           
        </div>
    );
}

export default ProfileUpdateModal;
