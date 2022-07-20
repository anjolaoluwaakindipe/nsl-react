import React from 'react'
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../utils/constants/allPaths';

function ProfileSuccessfullySubmitted(prop: { cancelModal: () => void }) {
     const navigate = useNavigate();
     const onOk = () => {
         prop.cancelModal();
         navigate(paths.USER_DASHBOARD);
     };
     return (
         <div className="  m-20 md:w-96 h-auto bg-white p-5 md:p-10 rounded-xl">
             <img
                 src="/assets/successtick.svg"
                 alt="success_img"
                 className="object-contain md:w-20 w-16 mx-auto"
             />
             <h3 className="pt-5 text-2xl md:text-2xl font-bold text-primaryColor text-center">
                 Profile Successfully Updated!
             </h3>
             <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-lg  py-10">
                 Please patiently wait for your profile to be reviewed. An email
                 will be sent after your profile has been verified before you
                 can proceed.
             </h5>

             <button className="btn1 w-full" onClick={onOk}>
                 OK
             </button>
         </div>
     );
}

export default ProfileSuccessfullySubmitted