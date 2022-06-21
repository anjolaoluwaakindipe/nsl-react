import { authSelector } from "../../../../state/authSlice";
import { useSelector } from "react-redux";

function CardDetailsModal (prop: { cancelModal:() => void  }){
    const { errorMessage } = useSelector(authSelector);
    const onProceed = () => {
        prop.cancelModal();
    };
    return(
        <div>
this modal
        </div>

    );
}

export default CardDetailsModal;