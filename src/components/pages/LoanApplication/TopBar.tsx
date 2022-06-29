import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";

function TopBar() {
  const navigate = useNavigate();
  return (
      <div className="w-full flex justify-between ">
          <FaAngleLeft className="text-2xl cursor-pointer" 
          onClick={()=>{navigate(paths.USER_DASHBOARD)}}/>
          
      </div>
  );
}

export default TopBar