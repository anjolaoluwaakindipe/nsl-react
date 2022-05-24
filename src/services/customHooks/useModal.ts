import { useDispatch } from 'react-redux';
import { closeModal, makeUnCancellable, openModal,  setModalName } from '../../state/modalSlice';
import { AppDispatch } from '../../state/store';

export const useModal = (modalName:string, isCancellable:boolean = true, callBack:()=>void)=>{
    const dispatch = useDispatch<AppDispatch>();

    const openModalFunc = () =>{
        dispatch(openModal())
        dispatch(setModalName(modalName));
        dispatch(makeUnCancellable({ cancellable: isCancellable }));
    }

    const closeModalFunc = () =>{
        dispatch(closeModal())
    }

    
    // dispatch(setCallBack({callback:()=>{
    //     callBack()
    // }}))

    return { openModalFunc, closeModalFunc}
}