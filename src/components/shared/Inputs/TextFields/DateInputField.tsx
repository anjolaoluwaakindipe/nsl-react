import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type DateInputFieldProp = {
    errorMessage?: string;
    placeholder?: string;
    id: string;
    registerName?: string;
    register?: UseFormRegisterReturn;
    type?: React.HTMLInputTypeAttribute;
    step?: string;
    pattern?: string;
    value?: string;
    //  onChange?: React.HTMLInputElement;
    formNoValidate?: boolean;
    readOnly?: boolean;
    onChange?: (...event: any[]) => void;
};

function DateInputField({
    register,
    onChange,
    errorMessage,
    placeholder,
    id,
}: DateInputFieldProp) {
    return (
        <div className="w-full">
            <div className="border-0 border-b-2 border-underlineColor floating-placeholder relative ">
                <input
                    type="text"
                    {...register}
                    id={"DateInputField__" + id}
                    onChange={onChange}
                    className="outline-none pb-4  w-full cursor-pointer"
                    placeholder=" "
                    onFocus={(e) => {
                        e.target.type = "date";
                    }}
                    onBlur={(e) => {
                        e.target.type = "text";
                    }}
                />
                <label
                    htmlFor={"DateInputField__" + id}
                    className="cursor-pointer text-gray-400 pointer-events-none"
                >
                    {placeholder}{" "}
                </label>
            </div>
            {<p className="text-xs text-red-900 ">{errorMessage}</p>}
        </div>
    );
}

export default DateInputField;
