import React from "react";
import CurrencyInput from "react-currency-input-field";
import { UseFormRegisterReturn } from "react-hook-form";
import { useState, useEffect } from "react";

type CurrencyInputFieldProp = {
    register?: UseFormRegisterReturn;
    errorMessage?: string | null;
    placeholder?: string | null;
    id: string | null;
    value?: string;
    onChange?: (...event: any[]) => void;
};

function CurrencyInputField({
    register,
    errorMessage,
    placeholder,
    id,
    onChange,
    value,
}: CurrencyInputFieldProp) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (newValue: string | undefined, name?: string) => {
        if (parseFloat(newValue!)) {
            setInputValue(newValue!);
            onChange!(newValue!);
        } else {
            setInputValue("0");
            if (onChange) {
                onChange!("0");
            }
        }
    };

    useEffect(() => {
        if (parseFloat(value!)) {
            setInputValue(value!);
        } else {
            setInputValue("0");
        }
    }, [value]);

    return (
        <div className="w-full">
            {/*amount*/}
            <div className=" border-0 border-b-2 border-underlineColor flex  space-x-3 items-end relative floating-placeholder">
                <h1 className="pb-4 mr-2 ">N</h1>

                <CurrencyInput
                    {...register}
                    id="LoanApplication__amount"
                    className="outline-none pb-4  w-full inline-block"
                    placeholder=" "
                    value={inputValue}
                    onValueChange={handleChange}
                />
                <label
                    htmlFor={"CurrencyInput__" + id}
                    className="cursor-pointer text-gray-400 pointer-events-none "
                    style={{ left: "20px" }}
                >
                    {placeholder}
                </label>
            </div>
            {<p className="text-xs text-red-900  ">{errorMessage}</p>}
        </div>
    );
}

export default CurrencyInputField;
