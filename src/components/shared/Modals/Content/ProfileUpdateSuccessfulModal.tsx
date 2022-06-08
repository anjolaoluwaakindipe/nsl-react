import React from 'react'
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../utils/constants/allPaths';

function ProfileUpdateSuccessfulModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const onProceed = () => {
        prop.cancelModal();
        navigate(paths.USER_DASHBOARD);
    };
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <img
                src="/assets/successtick.svg"
                alt="success_img"
                className="object-contain md:w-20 w-16 mx-auto"
            />
            <h3 className="pt-5 text-2xl md:text-4xl font-bold text-primaryColor text-center">
                Profile Update Successful!
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-2xl  py-10">
                You can now proceed to make your loan application
            </h5>

            <button className="btn1 w-full" onClick={onProceed}>
                Proceed
            </button>
        </div>
    );
}

export default ProfileUpdateSuccessfulModal