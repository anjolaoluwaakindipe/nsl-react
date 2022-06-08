import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../utils/constants/allPaths";

function ProfileUpdateModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const onProceed = () => {
        prop.cancelModal();
        navigate(
            paths.UPDATE_PROFILE.base + paths.UPDATE_PROFILE.PERSONAL_DETAILS
        );
    };
    return (
        <div className="m-10 flex flex-col  h-auto bg-white p-10 rounded-xl">
            <AiOutlineClose
                className="text-xl self-end cursor-pointer"
                onClick={prop.cancelModal}
            />
            <div className="flex space-x-7 pb-5">
                <img
                    src="assets/updateprofile.svg"
                    alt="updateprofile_img"
                    className="object-contain md:w-10 w-8 mx-auto "
                />
                <div>
                    <h3 className="pt-5 text-xl md:text-3xl font-bold text-primaryColor">
                        Profile Update
                    </h3>
                    <h5 className="md:max-w-[400px]  max-w-[500px] min-w-[200px] text-sm  md:text-base ">
                        You are required to update your profile before you make
                        any Loan request
                    </h5>
                </div>
            </div>

            <button className="btn1 self-end py-2  " onClick={onProceed}>
                Ok
            </button>
        </div>
    );
}

export default ProfileUpdateModal;
