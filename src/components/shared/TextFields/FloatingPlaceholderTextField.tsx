import {  UseFormRegisterReturn } from "react-hook-form";

type FloatinPlaceholderTextFieldProps = {
    errorMessage?: string;
    placeholder?: string;
    id?: string;
    registerName?: string;
    register?: UseFormRegisterReturn;
    type: React.HTMLInputTypeAttribute;
    step?: string;
    pattern?: string;
    value?: string;
  //  onChange?: React.HTMLInputElement;
    formNoValidate?: boolean;
};

function FloatingPlaceholderTextField(props: FloatinPlaceholderTextFieldProps) {
    return (
        <div className="w-full">
            <div className="border-0 border-b-2  border-underlineColor relative floating-placeholder">
                <input
                    type={props.type}
                    {...props.register}
                    className="outline-none pb-4   w-full "
                    id={props.id}
                    placeholder=" "
                    step={props.step}
                    pattern={props.pattern}
                    value={props.value}
                    // onChange={props.onChange}
                    formNoValidate={props.formNoValidate}
                    
                />
                <label
                    htmlFor="CreateAccount__confirmPassword"
                    className="cursor-pointer text-gray-400 pointer-events-none"
                >
                    {props.placeholder}
                </label>
            </div>
            <p className="text-xs text-red-900  ">{props.errorMessage}</p>
        </div>
    );
}

export default FloatingPlaceholderTextField;
