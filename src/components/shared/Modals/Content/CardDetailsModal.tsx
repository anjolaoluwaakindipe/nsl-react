import { authSelector } from "../../../../state/authSlice";
import { useSelector } from "react-redux";
import FloatingPlaceholderTextField from "../../Inputs/TextFields/FloatingPlaceholderTextField";
import SingleTextField from "../../Inputs/TextFields/SingleTextField";
import creditCardType from "credit-card-type";
import { useNavigate } from "react-router-dom";

import { AiOutlineCreditCard } from "react-icons/ai";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";



type CardDetailsProps={
    
}
 


function CardDetailsModal(prop: { cancelModal: () => void }) {
    const { errorMessage } = useSelector(authSelector);
    const onProceed = () => {
        prop.cancelModal();
    };



    const navigate = useNavigate;
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl grid grid-cols-12 gap-y-5 gap-x-5">


            <h3 className="pt-5 text-left text-2xl md:text-xl font-bold text-primaryColor col-span-12">
                Add New Card
            </h3>

            {/*Accounnt Number*/}
            <div className="col-span-12">
                <div className="relative">
                    <input type="number"
                        max={10}
                        id="cardNumber"
                        aria-describedby="outlined_success_help"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-600 appearance-none dark:text-white   focus:outline-none focus:ring-0  peer"
                        placeholder="XX-XXX-XXX-XX"

                    />
                    <label htmlFor="cardNumber"
                        className="absolute text-sm text-gray-900 dark:text-green-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Account Number   
                        <span>
                            
                            <AiOutlineCreditCard/>
                            </span>
                    </label>
                </div>
            </div>

            {/*expiry date*/}
            <div className="col-span-12 md:col-span-6">
                <div className="relative">
                    <input type="number"
                        max={4}
                        id="expiry date"
                        aria-describedby="outlined_success_help"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-600 appearance-none dark:text-white   focus:outline-none focus:ring-0  peer"
                        placeholder="XX/XX"
                    />
                    <label htmlFor="expiryDate"
                        className="absolute text-sm text-gray-900 dark:text-green-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        expiry date
                    </label>
                </div>
            </div>


            {/*cvv*/}
            <div className="col-span-12 md:col-span-6">
                <div className="relative">
                    <input type="number"
                        max={3}
                        id="cvv"
                        aria-describedby="outlined_success_help"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-600 appearance-none dark:text-white   focus:outline-none focus:ring-0  peer"
                        placeholder="XXX" />
                    <label htmlFor="cvv"
                        className="absolute text-sm text-gray-900 dark:text-green-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        CVV
                    </label>
                </div>
            </div>


            {/*Accounnt Name*/}
            <div className="col-span-12">
                <div className="relative">
                    <input type="text"

                        id="cardName"

                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-600 appearance-none dark:text-white   focus:outline-none focus:ring-0  peer"
                        placeholder="  " />
                    <label htmlFor="cardName"
                        className="absolute text-sm text-gray-900 dark:text-green-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Account Name
                    </label>
                </div>
            </div>

            <div className="col-span-12">
                <button
                    className={`btn1  float-right w-full`}

                    onClick={onProceed}
                >
                    Add Card
                </button>
            </div>

        </div>

    );
}

export default CardDetailsModal;