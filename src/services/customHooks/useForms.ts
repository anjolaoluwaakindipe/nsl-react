import {  useState } from "react";

const useForms =  ({
    initialValues,
    validation,
}: {
    initialValues: Record<string, any>;
    validation?:  (values:Record<string,any>) => ({});
}) => {
    const [formFields, setFormFields] = useState(initialValues);

    const [errors, setErrors] = useState({});

    const handleFormChanges = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        validation && setErrors(validation(formFields));
    };

    return { formFields, handleFormChanges, handleFormSubmit, validationErrors: errors as Record<string, any> };
};

export default useForms;
