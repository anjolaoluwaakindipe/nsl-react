import React from "react";
import { useState, useEffect } from "react";

type Option = {
    label: string;
    value: string;
};

type CardInputProps = {
    options: Option[];
    onChange?: (...event: any[]) => void;
    value: Option | null;
    label?: string;
};

function CardInput({ options, onChange, value, label }: CardInputProps) {
    const [selectedValue, setSelectedValue] = useState(value || null);

    useEffect(() => {
        onChange && onChange(selectedValue);
    }, [selectedValue, onChange]);

    const onOptionClick = (value: Option) => {
        setSelectedValue(value);
    };

    const selectedOptionColor = (option: Option) => {
        if (selectedValue === option) {
            return "ring-primaryColor ring-1  bg-yellow-300";
        }
        return "hover:bg-yellow-300";
    };

    return (
        <div className="space-y-4">
            <div>
                {label && (
                    <div className="flex">
                        <h1 className=" text-gray-400">{label} :</h1> &nbsp;
                        <h5>{selectedValue ? selectedValue?.label : ""}</h5>
                    </div>
                )}
            </div>
            <div className="grid md:grid-cols-10 sm:grid-cols-8 grid-cols-4 gap-y-4 lg:grid-cols-12">
                {options.map((option, index) => {
                    return (
                        <div className=" col-span-2" key={index}>
                            <div
                                className={` bg-yellow-200 ${selectedOptionColor(
                                    option
                                )} px-4 py-2 rounded-md cursor-pointer max-w-max`}
                                onClick={() => onOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CardInput;
