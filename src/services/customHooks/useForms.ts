import {  useState, useEffect } from "react";

const useForms =  ({
    initialValues,
    validation,
    callback
}: {
    initialValues: Record<string, any>,
    validation?:  (values:Record<string,any>) => ({}),
    callback:()=>void
}) => {
    
    // state 
    const [formFields, setFormFields] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // handles text values and onchanges
    const handleFormChanges = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormFields((preval)=>({
            ...formFields,
            [e.target.name]:(e.target.validity.valid? e.target.value: preval[e.target.name]),
        }));
    };

    // handles submission and errors
    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        validation && setErrors(validation(formFields));
    };

    useEffect(()=>{
        if(Object.keys(errors).length === 0 && isSubmitting){
            setSubmitButtonDisabled(true)
            callback && callback()
            setIsSubmitting(false)
        }
        
    }, [errors, isSubmitting, callback])



    return { formFields, handleFormChanges, handleFormSubmit, validationErrors: errors as Record<string, any>,isSubmitButtonDisabled, setSubmitButtonDisabled };
};

export default useForms;
