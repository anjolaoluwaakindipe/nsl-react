import { UseFormRegisterReturn } from "react-hook-form";
import Dropdown, { Group, Option } from "react-dropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";


type DropDownOptionsProps = {
    placeholder: string;
    errorMessage?: string;
    options: (string | Option | Group)[];
    onChange?: (...event: any[]) => void;
    value?: Option | undefined;
};



function DropDownOptions(props: DropDownOptionsProps) {
    const genderDropdownOptions = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
    ];

    const maritalStatusDropdownOptions = [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Divorce", label: "Divorce" },
        { value: "Widow", label: "Widow" },
        { value: "Remarried", label: "Remarried" },
    ];
    const {

        watch,
        formState: { errors },
    } = useForm();
    const watchGender = watch("gender");
    return (
        <div>
            <div className=" border-0 border-b-2  border-underlineColor   ">

                <Dropdown
                    options={props.options}
                    onChange={props.onChange}
                    arrowClosed={<IoMdArrowDropdown />}
                    arrowOpen={<IoMdArrowDropup />}
                    value={
                        props.value &&
                            props.value?.label! === "" &&
                            props.value?.value! === ""
                            ? undefined
                            : props.value
                    }
                    placeholder={props.placeholder}
                    className="relative"
                    placeholderClassName={
                        watchGender && watchGender.value !== ""
                            ? "text-black"
                            : "text-gray-400"
                    }
                    controlClassName="appearance-none text-gray-400 outline-none border-0 pb-4  m-0 cursor-pointer flex justify-between items-end"
                    menuClassName="absolute  left-0 top-16 w-full bg-gray-100 max-h-36 rounded-md scrollbar scrollbar-visible space-y-2 overflow-y-scroll p-3"
                />



                <label htmlFor="gender"></label>
            </div>

            {
                <p className="text-xs text-red-900 ">
                    {props.errorMessage}
                </p>
            }
        </div>
    )
};





export default DropDownOptions;


// {errors?.gender?.value.message}