import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

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
    readOnly?: boolean;
};

function FloatingPlaceholderTextField(props: FloatinPlaceholderTextFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full">
            <div className="border-0 border-b-2  border-underlineColor relative floating-placeholder flex items-center">
                <input
                    type={showPassword ? "text" : props.type}
                    {...props.register}
                    className="outline-none pb-4   w-full "
                    id={props.id}
                    placeholder={props.readOnly ? undefined : " "}
                    step={props.step}
                    pattern={props.pattern}
                    value={props.value}
                    readOnly={props.readOnly}
                    // onChange={props.onChange}
                    formNoValidate={props.formNoValidate}
                />
                <label
                    htmlFor="CreateAccount__confirmPassword"
                    className="cursor-pointer text-gray-400 pointer-events-none"
                >
                    {props.placeholder}
                </label>
                {props.type === "password" ? (
                    <div
                        className="text-2xl text-primaryColor cursor-pointer"
                        onClick={() =>
                            setShowPassword((prevState) => !prevState)
                        }
                    >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                ) : null}
            </div>
            <p className="text-xs text-red-900  ">{props.errorMessage}</p>
        </div>
    );
}

export default FloatingPlaceholderTextField;
