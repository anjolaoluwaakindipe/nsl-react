import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { AiOutlineCreditCard } from "react-icons/ai";
import CardDetailsModal from "./CardDetailsModal";
import creditCardType from "credit-card-type";
import { CreditCardType } from "credit-card-type/dist/types";

function CardTypes(cardNumber: string) {
    const cardType: CreditCardType[] = creditCardType(cardNumber);
    const mostlikeyCardType = cardType.sort((a, b) => {
        if (a.matchStrength! > b.matchStrength!) {
            return 1;
        }
        return 0;
    })[0];
    console.log(cardType);

    console.log(mostlikeyCardType);
    switch (mostlikeyCardType.type) {
        case "mastercard":
            return <FaCcVisa />;

        case "visa":
            return <FaCcMastercard />;

        default:
            return <AiOutlineCreditCard />;
    }
}

CardTypes("4369100334934278");

export default CardTypes;
