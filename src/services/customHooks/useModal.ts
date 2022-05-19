import { useDispatch } from 'react-redux';
import { closeModal, makeUnCancellable, openModal, setCallBack, setModalName } from '../../state/modalSlice';
import { AppDispatch } from '../../state/store';

export const useModal = (modalName:string, isCancellable:boolean = true, callBack:()=>void)=>{
    const dispatch = useDispatch<AppDispatch>();

    const openModalFunc = () =>{
        dispatch(openModal)
    }

    const closeModalFunc = () =>{
        dispatch(closeModal)
    }

    dispatch(setModalName(modalName))
    dispatch(makeUnCancellable(isCancellable))
    dispatch(setCallBack(()=>{
        callBack()
    }))

    return { openModalFunc, closeModalFunc}
}