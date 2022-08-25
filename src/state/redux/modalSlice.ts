import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../../typings";

const initialState: ModalState = {
    isOpen: false,
    // callBack: function(){},
    isCancellable: true,
    modalName: "",
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        closeModal(state: ModalState) {
            state.isOpen = false;
        },
        openModal(state: ModalState) {
            state.isOpen = true;
        },
        // setCallBack(
        //     state: ModalState,
        //     action: PayloadAction<{ callback: () => void }>
        // ) {
        //     state.callBack = action.payload.callback;
        // },
        makeUnCancellable(
            state: ModalState,
            action: PayloadAction<{ cancellable: boolean }>
        ) {
            state.isCancellable = action.payload.cancellable;
        },
        setModalName(state: ModalState, action: PayloadAction<string>) {
            state.modalName = action.payload;
        },
    },
});

export const {
    closeModal,
    openModal,
    // setCallBack,
    makeUnCancellable,
    setModalName,
} = modalSlice.actions;

export default modalSlice.reducer;
