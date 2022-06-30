import { UseFormRegisterReturn } from "react-hook-form";
import Dropdown from "react-dropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";

type pickprop = {
    a: string;
};

function DropOptions({ status }: { status: string }) {
    //gender
    function GenderDropDown() {
        const genderDropdownOptions = [
            { value: "M", label: "Male" },
            { value: "F", label: "Female" },
        ];
        const {
            control,
            watch,
            formState: { errors },
        } = useForm();

        const watchGender = watch("gender");
        return (
            <div>
                <div className=" border-0 border-b-2  border-underlineColor   ">
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Dropdown
                                    options={genderDropdownOptions}
                                    onChange={onChange}
                                    arrowClosed={<IoMdArrowDropdown />}
                                    arrowOpen={<IoMdArrowDropup />}
                                    value={
                                        value &&
                                        value.label === "" &&
                                        value.value === ""
                                            ? undefined
                                            : value
                                    }
                                    placeholder="Gender"
                                    className="relative"
                                    placeholderClassName={
                                        watchGender && watchGender.value !== ""
                                            ? "text-black"
                                            : "text-gray-400"
                                    }
                                    controlClassName="appearance-none text-gray-400 outline-none border-0 pb-4  m-0 cursor-pointer flex justify-between items-end"
                                    menuClassName="absolute  left-0 top-16 w-full bg-gray-100 max-h-36 rounded-md scrollbar scrollbar-visible space-y-2 overflow-y-scroll p-3"
                                />
                            );
                        }}
                    />

                    <label htmlFor="gender"></label>
                </div>

                {
                    <p className="text-xs text-red-900 ">
                        {/* {errors?.gender?.value.message} */}
                    </p>
                }
            </div>
        );
    }

    //marital status
    function MaritalStatusDropDown() {
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
                                placeholder="Marital Status"
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
                        {/* {errors?.maritalstatus?.value.message} */}
                    </p>
                }
            </div>
        );
    }

    switch (status) {
        case "gender": {
            return <GenderDropDown />;
        }
        case "maritalstatus": {
            return <MaritalStatusDropDown />;
        }
        default: {
            return <div></div>;
        }
    }
}

//main dropdown function
function Drop(prop: pickprop) {
    return (
        <div>
            <DropOptions status={prop.a} />
        </div>
    );
}
export default Drop;

// {errors?.gender?.value.message}
