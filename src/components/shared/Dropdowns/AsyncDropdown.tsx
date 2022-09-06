import { useState, useRef } from "react";
import AsyncSelect from "react-select/async";
import {
    ActionMeta,
    OptionsOrGroups,
    StylesConfig,
} from "react-select/dist/declarations/src";
import Select from "react-select/dist/declarations/src/Select";

type AsyncDropdownProps = {
    loadOptions?: (
        inputValue: string,
        callback: (options: any[]) => void
    ) => void;
    defaultOptions?: boolean | OptionsOrGroups<any, any>;
    cacheOptions?: boolean | OptionsOrGroups<any, any>;
    onChange?: (...event: any[]) => void;
    value?: any;
    placeholder?: string;
    errorMessage?: string;
};

const customStyle: StylesConfig<any, false, any> = {
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? "#E5E5E5" : "transparent",
        color: "black",
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: "#FFFEFE",
        borderRadius: "5%",
        overflow: "hidden",
    }),
    valueContainer: (provided, state) => ({
        ...provided,

        outline: "none",
        borderWidth: "0px",
        backgroundColor: "transparent",
        paddingLeft: "0",
    }),
    control: (base) => ({
        ...base,
        border: 0,
        // This line disable the blue border
        boxShadow: "none",
        padding: "0px",
        paddingBottom: "1rem",
    }),
};

function AsyncDropdown({
    loadOptions,
    defaultOptions,
    cacheOptions,
    onChange,
    value,
    placeholder,
    errorMessage,
}: AsyncDropdownProps) {
    const dropdownRef = useRef<Select<any, false, any>>(null);
    const [inputValue, setInputValue] = useState("");
    const [optionSelected, setOptionSelected] = useState<{
        label: string;
        value: object | string;
    } | null>(null);

    const handleInputChange = (newValue: string) => {
        const modifyNewValue = newValue.replace(/\W/g, "");
        setInputValue(modifyNewValue);
        return inputValue;
    };

    const onOptionChange = (
        newValue: { label: string; value: object | string },
        actionMeta: ActionMeta<any>
    ) => {
        console.log(newValue);
        onChange && onChange(newValue.value);
        setOptionSelected(newValue);
    };

    return (
        <div className="w-full ">
            <div className=" border-0 border-b-2 border-underlineColor relative floating-placeholder">
                <AsyncSelect
                    ref={dropdownRef}
                    styles={customStyle}
                    loadOptions={loadOptions}
                    defaultOptions={defaultOptions}
                    cacheOptions={cacheOptions}
                    onInputChange={handleInputChange}
                    onChange={onOptionChange}
                    value={optionSelected}
                    placeholder={" "}
                />

                <label
                    htmlFor="gender"
                    className={`absolute bottom-[15px] left-14 origin-left cursor-pointer text-gray-400 pointer-events-none transition-all delay-200 ease-in-out
                        ${
                            optionSelected && optionSelected?.label! !== ""
                                ? "-translate-y-8  scale-75"
                                : ""
                        }`}
                >
                    {placeholder}
                </label>
            </div>

            {<p className="text-xs text-red-900 ">{errorMessage}</p>}
        </div>
    );
}

export default AsyncDropdown;
