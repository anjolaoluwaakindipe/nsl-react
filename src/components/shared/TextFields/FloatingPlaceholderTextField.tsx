import { FieldValues, UseFormRegister } from "react-hook-form";

type FloatinPlaceholderTextFieldProps = {
    errorMessage?: string;
    placeholder?: string;
    id?: string;
    registerName?: string;
    register?: UseFormRegister<any>;
    type: React.HTMLInputTypeAttribute;
};

function FloatingPlaceholderTextField(props: FloatinPlaceholderTextFieldProps) {
    return (
        <div className="w-full">
            <div className="border-0 border-b-2  border-underlineColor relative floating-placeholder">
                <input
                    type={props.type}
                    {...props.register!(props.registerName!)!}
                    className="outline-none pb-4   w-full "
                    id={props.id}
                    placeholder=" "
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
