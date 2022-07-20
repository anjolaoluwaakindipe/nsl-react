import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useModal } from "../../services/customHooks/useModal";
import { authSelector } from "../../state/authSlice";
import { paths } from '../../utils/constants/allPaths';

function HalfNavBarLayout({ children }: { children?: JSX.Element }) {
    const { user } = useSelector(authSelector);
    const location = useLocation();

    const navigate = useNavigate();

    const { openModalFunc } = useModal("LogOutModal", false);
    return (
        <div className="bg-bgColor min-h-screen ">

            <div className=" flex justify-between items-center  md:max-w-2xl lg:max-w-4xl md:mx-auto py-5 mx-5 ">
                <img
                    src="/assets/companylogo2.svg"
                    alt="logo"
                    className="object-contain w-10 md:w-auto cursor-pointer hover:scale-105"
                    onClick={()=>{
                        if(user?.rfStatus === "Draft"){
                            navigate(paths.WELCOME)
                        }else if (user?.rfStatus === "New"){
                            navigate(paths.WAITING)
                        }else if (user?.rfStatus === "Processed"){
                            navigate(paths.USER_DASHBOARD)
                        }else{
                            navigate(paths.LANDINGPAGE)
                        }
                    }}
                />

                {/*logout*/}
                {user?.rfStatus && location.pathname !== paths.LOGIN  ? (
                    <div>
                        <button
                            className="flex justify-center items-center  w-20 h-7 md:w-25 md:h-10 text-sm bg-primaryColor rounded-lg text-contColor cursor-pointer hover:brightness-75"
                            onClick={() => {
                                openModalFunc();
                            }}
                        >
                            LOG OUT
                        </button>
                    </div>
                ) : null}
            </div>

            <div className="bg-contColor max-w-5xl mx-auto py-20 px-10 md:py-20 md:px-20 min-h-screen md:min-h-0">
                {children}
                <Outlet />
            </div>
        </div>
    );
}

export default HalfNavBarLayout;
