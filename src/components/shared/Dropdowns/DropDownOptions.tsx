import { UseFormRegisterReturn } from "react-hook-form";
import Dropdown, { Group, Option } from "react-dropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";

type DropDownOptionsProps = {
    placeholder: string;
    errorMessage?: string;
    options: (string | Option | Group | { label: string; value: string })[];
    onChange?: (...event: any[]) => void;
    value?: Option | undefined;
};

function DropDownOptions(props: DropDownOptionsProps) {
    const [options, setOptions] = useState<(string | Option | Group)[]>([]);
    const [value, setValue] = useState<Option | undefined>(undefined);

    useEffect(() => {
        if (props.options!) {
            setOptions(props.options);
        }
    }, [props.options]);

    const handleChange = (e: any) => {
        setValue(e);
        props.onChange!(e);
    };

    useEffect(() => {
        if (props.value!) {
            setValue(props.value);
        }
    }, [props.value]); //eslint-disable-line



    return (
        <div className="w-full ">
            <div className=" border-0 border-b-2   border-underlineColor relative floating-placeholder  ">
                <Dropdown
                    options={options}
                    onChange={handleChange}
                    arrowClosed={<IoMdArrowDropdown />}
                    arrowOpen={<IoMdArrowDropup />}
                    value={
                        value && value?.label! === "" && value?.value! === ""
                            ? undefined
                            : value
                    }
                    placeholder="hkjk "
                    className="relative"
                    placeholderClassName={
                        value && value.value !== ""
                            ? "text-black"
                            : "text-transparent"
                    }
                    controlClassName="appearance-none text-gray-400 outline-none border-0 pb-4  m-0 cursor-pointer flex justify-between items-end"
                    menuClassName="absolute  left-0 top-16 w-full bg-gray-100 max-h-36 rounded-md scrollbar scrollbar-visible space-y-2 overflow-y-scroll p-3 z-10"
                />

                <label
                    htmlFor="gender"
                    className={`absolute bottom-[15px] left-14 origin-left cursor-pointer text-gray-400 pointer-events-none transition-all delay-200 ease-in-out
                        ${
                            value &&
                            value?.label! !== "" &&
                            value?.value! !== ""
                                ? "-translate-y-8  scale-75"
                                : ""
                        }`}
                >
                    {props.placeholder}
                </label>
            </div>

            {<p className="text-xs text-red-900 ">{props.errorMessage}</p>}
        </div>
    );
}

export default DropDownOptions;

// {errors?.gender?.value.message}
