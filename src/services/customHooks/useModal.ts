import { useDispatch } from 'react-redux';
import { closeModal, makeUnCancellable, openModal,  setModalName } from '../../state/redux/modalSlice';
import { AppDispatch } from '../../state/redux/store';
import { ModalNames } from '../../typings';

export const useModal = (modalName:ModalNames, isCancellable:boolean = true)=>{
    const dispatch = useDispatch<AppDispatch>();

    const openModalFunc = (newModalName?:ModalNames) =>{
        if(newModalName){

                dispatch(setModalName(newModalName));
                dispatch(openModal());
        }else{
            dispatch(setModalName(modalName));
            dispatch(openModal());
        }
        
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