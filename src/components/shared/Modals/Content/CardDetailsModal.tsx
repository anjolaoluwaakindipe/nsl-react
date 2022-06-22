import { authSelector } from "../../../../state/authSlice";
import { useSelector } from "react-redux";
import FloatingPlaceholderTextField from "../../Inputs/TextFields/FloatingPlaceholderTextField";
import SingleTextField from "../../Inputs/TextFields/SingleTextField";
import CreditCardInput from 'react-credit-card-input';

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
            <CreditCardInput
  cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
  cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
  cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
  fieldClassName="input"
/>
            </div>
        </div>

    );
}

export default CardDetailsModal;