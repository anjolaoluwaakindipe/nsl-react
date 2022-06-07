import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import { useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { closeModal } from "../../../state/modalSlice";

import { ModalState } from "../../../typings";
import PhoneEmailVerificationSuccessModal from "./Content/PhoneEmailVerificationSuccessModal";
import EmailVerificationSuccessModal from "./Content/EmailVerificationSucessModal";
import AccountCreatedSuccessModal from "./Content/AccountCreatedSucessModal";
import LoginSucessModal from "./Content/LoginSucessModal";
import LoginUnsuccessfulModal from "./Content/LoginUnsucessfulModal";
import ProfileUpdateModal from "./Content/ProfileUpdateModal";

function ModalContent(modalName: string, cancelModal: () => void): ReactElement {
    switch (modalName.trim()) {
        case "PhoneEmailVerificationSuccessModal":
            return <PhoneEmailVerificationSuccessModal cancelModal={cancelModal} />;
        case "EmailVerificationSuccessModal":
            return <EmailVerificationSuccessModal cancelModal={cancelModal} />;
        case "AccountCreatedSucessModal":
            return <AccountCreatedSuccessModal cancelModal={cancelModal} />;
        case "LoginSucessModal":
            return <LoginSucessModal cancelModal={cancelModal} />;
            case "LoginUnsucessfulModal":
                return <LoginUnsuccessfulModal cancelModal={cancelModal}/>;
                case "ProfileUpdateModal":
                    return <ProfileUpdateModal cancelModal={cancelModal}/>


        default:
            return <div></div>;
    }
}

function ModalProvider() {
    const modalState = useSelector<RootState>(
        (state) => state.modal
    ) as ModalState;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (modalState.isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [modalState.isOpen]);

    if (!modalState.isOpen) {
        return <div></div>;
    }

    const cancelModal = () => {
        dispatch(closeModal());
    };

    const onClickBackground: React.MouseEventHandler<HTMLDivElement> = (e) => {
        cancelModal();
    };

    return (
        <div
            className="bg-opacity-25 bg-black fixed top-0 left 0 w-full h-screen z-10 flex items-center justify-center"
            onClick={modalState.isCancellable ? onClickBackground : undefined}
        >
            <div
                className="bg-white p-6 w-62 h-50 md:w-50 md:h-70 overflow-y-scroll scrollbar rounded-3xl"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="w-full flex justify-end py-1">
                    {modalState.isCancellable && (
                        <AiOutlineClose
                            strokeWidth={50}
                            className="cursor-pointer hover:text-red-600"
                            onClick={cancelModal}
                        />
                    )}
                </div>

                {ModalContent(modalState.modalName, cancelModal)}
            </div>
        </div>
    );
}

export default ModalProvider;
