import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { AiOutlineCreditCard } from "react-icons/ai";
import CardDetailsModal from "./CardDetailsModal";

function  CardTypes(){
    switch (CardDetailsModal) {
        case :
            return <FaCcVisa/>;
            
        case :{
            return <FaCcMastercard/>
        }
    
        default:
            return <AiOutlineCreditCard/>
    }
}


export default CardTypes;
 