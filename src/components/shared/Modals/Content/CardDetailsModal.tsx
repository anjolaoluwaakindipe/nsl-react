import { authSelector } from "../../../../state/authSlice";
import { useSelector } from "react-redux";
import FloatingPlaceholderTextField from "../../Inputs/TextFields/FloatingPlaceholderTextField";
import SingleTextField from "../../Inputs/TextFields/SingleTextField";
import creditCardType from "credit-card-type";

function CardDetailsModal(prop: { cancelModal: () => void }) {
    const { errorMessage } = useSelector(authSelector);
    const onProceed = () => {
        prop.cancelModal();
    };
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl grid grid-cols-12">


            <h3 className="pt-5 text-left text-2xl md:text-xl font-bold text-primaryColor col-span-12">
                Add New Card
            </h3>

            {/*Accounnt Number*/}
            <div className=" cols-span-12">
                <div className="w-full">
                    <div className="rounded-sm">
                    <input
                        type="number"
                        max={10}
                        className="text-sm text-white  "
                        placeholder="XX-XXX-XXX-XX"
                    ></input>
                    </div>
                </div> 
            </div>

            <div className=" col-span-12 ">
                <FloatingPlaceholderTextField
                    placeholder="BVN"
                    type="text"
                    
                    registerName="BVN"
                    id="EditProfileDetails__bvn"
/>
            </div>


        </div>

    );
}

export default CardDetailsModal;