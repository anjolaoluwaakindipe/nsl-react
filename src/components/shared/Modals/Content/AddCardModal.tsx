import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../utils/constants/allPaths";

function AddCardModal(prop: { cancelModal: () => void }) {
    const navigate = useNavigate();
    const navigateToAddCardPage = () => {
        navigate(paths.ADD_CARD_INFO);
        prop.cancelModal();
    };

    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <h2 className="text-xl md:text-2xl font-bold text-center w-full">
                No Card Details Found
            </h2>
            <p className="md:text-xl font-light text-center pt-4 pb-6">
                You do not have any card details attached to your profile.
                Kindly add your card details, by clicking on the button below.
            </p>

            <button className="btn1 w-full" onClick={navigateToAddCardPage}>
                Add Card
            </button>
        </div>
    );
}

export default AddCardModal;
