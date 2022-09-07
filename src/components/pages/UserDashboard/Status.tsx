import React from "react";
//import StatusView from "./StatusView";
import { Link, Navigate } from "react-router-dom";
import EmptyStatus from "./EmptyStatus";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";
import { Loan } from "../../../typings";
import { useModal } from "../../../services/customHooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { setListState, loanSelector } from "../../../state/redux/loanSlice";

type StatusProp = {
    loantype: string;
    amount: string;
    applicationReference: string;
    statustype: Loan["statusCode"];
    status: string;
};

function Status(props: StatusProp) {
    const navigate = useNavigate();
    const { openModalFunc } = useModal("SignLoanContractModal", false);
    const dispatch = useDispatch();
    const loanList = useSelector(loanSelector).loanList;

    const navigateToContract = () => {
        if (loanList) {
            dispatch(
                setListState({
                    selectedLoan: loanList.find(
                        (loan) =>
                            loan.applicationReference ===
                            props.applicationReference
                    ),
                })
            );
            if (props.statustype === "AWAITINGCUSTOMERAGREEMENT") {
                openModalFunc();
                // dispatch(setListState({selectedLoan: }))
                // navigate(paths.LOAN_CONTRACT + "/" + props.applicationReference);
            } else {
                navigate(
                    paths.LOAN_INFORMATION + "/" + props.applicationReference
                );
            }
        }
    };

    return (
        <div
            className="md:p-10 p-5 w-full grid grid-cols-4 gap-20  font-semibold bg-bgColor3 hover:bg-secondaryColor rounded-xl transition-colors duration-75 ease-in cursor-pointer "
            onClick={navigateToContract}
        >
            <h3 className="flex justify-center items-center">
                {props.loantype}
            </h3>

            <h3 className=" flex justify-center  items-center">
                {props.amount}
            </h3>

            <div className=" flex justify-center  items-center text-center ">
                <StatusType
                    status={props.statustype}
                    statusText={props.status}
                />
            </div>

            <div className="flex justify-center items-center">
                <div
                    className="text-primaryColor hover:underline cursor-pointer flex justify-center items-center text-center"
                    onClick={navigateToContract}
                >
                    {props.statustype !== "AWAITINGCUSTOMERAGREEMENT"
                        ? "View"
                        : "Sign Contract"}
                </div>
            </div>
        </div>
    );
}

export default Status;

//status type
function StatusType({
    status,
    statusText,
}: {
    status: StatusProp["statustype"];
    statusText: string;
}) {
    const PendingApproval = (
        <div className="flex items-center justify-center  space-x-2">
            <div className="min-w-[10px] min-h-[10px]  bg-red-400 border-2 rounded-full " />
            <h3 className="max-w-[150px]">
                {statusText} {"      "}{" "}
            </h3>
        </div>
    );

    const PendingContractApproval = (
        <div className="flex  items-center justify-center space-x-2">
            <div className="min-w-[10px] min-h-[10px] bg-red-900 border-2 rounded-full " />
            <h3 className="max-w-[150px]">{statusText}</h3>
        </div>
    );

    const Approved = (
        <div className="flex items-center space-x-2">
            <div className="w-[10px] h-[10px] bg-green-600  rounded-full " />
            <h3 className="max-w-[200px]">Approved</h3>
        </div>
    );

    switch (status) {
        case "AWAITINGCUSTOMERAGREEMENT": {
            return PendingContractApproval;
        }

        default: {
            return PendingApproval;
        }
    }
}

//status view
function StatusView({ status }: { status: Number }) {
    const navigate = useNavigate();
    const ViewPendingApproval = (
        <div>
            <button
                className=" text-primaryColor hover:underline cursor-pointer flex justify-center items-center"
                onClick={() => {
                    navigate(paths.LOAN_INFORMATION);
                }}
            >
                View
            </button>
        </div>
    );

    const ViewPendingContractApproval = (
        <div>
            <button
                className=" text-primaryColor hover:underline cursor-pointer flex justify-center items-center"
                onClick={() => {
                    navigate(paths.LOAN_CONTRACT);
                }}
            >
                View
            </button>
        </div>
    );

    const ViewApproved = (
        <div>
            <button
                className="text-primaryColor hover:underline cursor-pointer flex justify-center items-center"
                onClick={() => {
                    navigate(paths.TERM_LOAN);
                }}
            >
                View
            </button>
        </div>
    );

    switch (status) {
        case 1: {
            return ViewPendingApproval;
        }
        case 2: {
            return ViewPendingContractApproval;
        }
        case 3: {
            return ViewApproved;
        }

        default:
            return ViewPendingApproval;
    }
}
