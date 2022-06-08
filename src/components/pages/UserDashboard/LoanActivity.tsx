import { useModal } from "../../../services/customHooks/useModal";
import StatusDet from "./StatusDet";


function LoanActivity() {


    const { openModalFunc } = useModal(
        "ProfileUpdateModal",
        false,
        
    );

    const onSubmit = (() => {
        openModalFunc();
    });
    return (
        <div className="mt-10 md:p-10 p-5" onSubmit={onSubmit}>
            <div className="lg:px-10 pb-3 w-full flex justify-between ">
                <h3 className="md:text-justify font-bold">Loan Requests</h3>
                <button
                    className="btn1 py-1 px-2 flex md:px-4 md:py-4"
                    //onClick={()=>{navigate(paths.LOAN_APPLICATION)}}
                    onClick={() => {
                        openModalFunc();
                    }}
                >
                    <div>+</div>
                    <div className="hidden md:block pl-2"> New Loan</div>
                </button>
            </div>

            <div className="overflow-x-scroll md:overflow-auto w-full mb-10">
                <div className="space-y-5 pt-5  p-0 w-[600px] sm:w-full text-sm md:text-md ">
                    <div className="md:p-10 p-5 w-full grid grid-cols-4 gap-20 bg-white font-semibold text-primaryColor ">
                        <h3 className="text-center">Loan Type</h3>
                        <h3 className="text-center"> Amount</h3>
                        <h3 className="text-center">Status </h3>
                        <h3 className="text-center">View</h3>
                    </div>

                    <StatusDet />
                </div>
            </div>
        </div>
    );
}

export default LoanActivity;

//
