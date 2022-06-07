import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import { useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { closeModal } from "../../../state/modalSlice";

import { ModalState } from "../../../typings";
import PhoneEmailVerificationSuccessModal from "./Content/PhoneEmailVerificationSuccessModal";
import BeginVerificationModal from "./Content/BeginVerificationModal";

function ModalContent(
    modalName: string,
    cancelModal: () => void,
    
): ReactElement {
    switch (modalName.trim()) {
        case "PhoneEmailVerificationSuccessModal":
            return (
                <PhoneEmailVerificationSuccessModal cancelModal={cancelModal} />
            );
        case "BeginVerificationModal":
            return <BeginVerificationModal cancelModal={cancelModal} />;
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
                className=""
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
        

                {ModalContent(modalState.modalName, cancelModal)}
            </div>
        </div>
    );
}

export default ModalProvider;
