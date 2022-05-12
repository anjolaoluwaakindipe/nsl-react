import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import { useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { closeModal } from "../../../state/modalSlice";

import { ModalState } from "../../../typings";

function ModalContent(modalName: string): ReactElement {
    switch (modalName.trim()) {
        case "successModal":
            return <div></div>;
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
                className="bg-white p-6 w-3/4 h-3/4 overflow-y-scroll scrollbar rounded-md"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="w-full flex justify-end py-1">
                    <AiOutlineClose
                        strokeWidth={50}
                        className="cursor-pointer hover:text-red-600"
                        onClick={
                            modalState.isCancellable ? cancelModal : undefined
                        }
                    />
                </div>

                {ModalContent(modalState.modalName)}
            </div>
        </div>
    );
}

export default ModalProvider;
