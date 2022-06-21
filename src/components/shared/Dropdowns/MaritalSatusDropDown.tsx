import Dropdown from "react-dropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";


type MaritalStatusDropDownProps= {
    placeholder?: string;
    errorMessage?: string;

}
function MaritalStatusDropDown(props: MaritalStatusDropDownProps) {

    const maritalStatusDropdownOptions = [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Divorce", label: "Divorce" },
        { value: "Widow", label: "Widow" },
        { value: "Remarried", label: "Remarried" },
    ];

    const { 
        control,
        watch,
        formState: { errors },
    } = useForm();

    const watchMaritalStatus = watch("maritalStatus");
    return (
        <div>
            <div className=" border-0 border-b-2  border-underlineColor   ">
                <Controller
                    name="maritalStatus"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Dropdown
                            options={maritalStatusDropdownOptions}
                            onChange={onChange}
                            arrowClosed={<IoMdArrowDropdown />}
                            arrowOpen={<IoMdArrowDropup />}
                            value={value}
                            placeholder={props.placeholder}
                            className="relative"
                            placeholderClassName={
                                watchMaritalStatus
                                    ? "text-black"
                                    : "text-gray-400"
                            }
                            controlClassName="appearance-none text-gray-400 outline-none border-0 pb-4  m-0 cursor-pointer flex justify-between items-end"
                            menuClassName="absolute  left-0 top-16 w-full bg-gray-100 max-h-36 rounded-md scrollbar scrollbar-visible space-y-2 overflow-y-scroll p-3"
                        />
                    )}
                />

                <label htmlFor="maritalstatus"></label>
            </div>

            {
                <p className="text-xs text-red-900 ">
                    {props.errorMessage}
                </p>
            }
        </div>
    );
};

export default MaritalStatusDropDown;

// {errors?.gender?.value?.message}