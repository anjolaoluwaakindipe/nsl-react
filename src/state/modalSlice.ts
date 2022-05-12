import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../typings";

const initialState: ModalState = {
    isOpen: false,
    callBack: () => {},
    isCancellable: true,
    modalName: "",
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        closeModal(state) {
            state.isOpen = false;
        },
        openModal(state) {
            state.isOpen = true;
        },
        setCallBack(state, action: PayloadAction<() => void>) {
            state.callBack = action.payload;
        },
        makeUnCancellable(state, action: PayloadAction<boolean>) {
            state.isCancellable = action.payload;
        },
        setModalName(state, action: PayloadAction<string>) {
            state.modalName = action.payload;
        },
    },
});

export const {
    closeModal,
    openModal,
    setCallBack,
    makeUnCancellable,
    setModalName,
} = modalSlice.actions;

export default modalSlice.reducer;
