import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { AiOutlineCreditCard } from "react-icons/ai";
import CardDetailsModal from "./CardDetailsModal";

function  CardTypes(cardValue: string){
    
    if (cardValue[0]  == "4") {
        //visa card
        return<FaCcVisa/>        
    }

    //mastercard
    else if(cardValue![0]=="5"){
return <FaCcMastercard/>
    }

    else {
        return <AiOutlineCreditCard/>
    }
}


export default CardTypes;
 