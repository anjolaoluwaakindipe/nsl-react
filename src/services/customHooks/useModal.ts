import { useDispatch } from 'react-redux';
import { closeModal, makeUnCancellable, openModal,  setModalName } from '../../state/modalSlice';
import { AppDispatch } from '../../state/store';

export const useModal = (modalName:string, isCancellable:boolean = true)=>{
    const dispatch = useDispatch<AppDispatch>();

    const openModalFunc = (newModalName?:string) =>{
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