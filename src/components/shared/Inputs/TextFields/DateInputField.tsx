import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState, useEffect } from 'react';
import moment from "moment";

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
    min?: string;
    max?: string;
};

function DateInputField({
    register,
    value,
    onChange,
    errorMessage,
    placeholder,
    id,
    min,
    max,
}: DateInputFieldProp) {
    const [dateValue, setDateValue] = useState<Date | string | moment.Moment>(
        ""
    );

    

    const [isPlaceholderVisilble, setPlaceholderVisibiltiy] = useState(true);

    const normalPlaceholderState = () => "";
    const floatingPlaceholderState = () => " -translate-y-8  scale-75 ";

    const changeDateValue = (value: moment.Moment | string) => {
        if (typeof value === "object") {
            console.log(value.format("YYYY-MM-DD"));
        }
        if (value) {
            setPlaceholderVisibiltiy(false);
            setDateValue(value);
            if (typeof value === "object" && onChange) {
                onChange(value.format("YYYY-MM-DD"));
            }
        } else {
            setPlaceholderVisibiltiy(true);
            setDateValue("");
            if (onChange){
                onChange("");
            }
            
        }
    };

    useEffect(()=>{
        value && changeDateValue(value)
    },[value])

    const showViewDate = () => {
        if (min && !max) {
            return min;
        } else if (!min && max) {
            return max;
        } else if (min && max) {
            return min;
        } else {
            return undefined;
        }
    };

    const validDates = (currentDate: any, selectedDate: any): boolean => {
        if (min && !max) {
            return currentDate.isAfter(moment(new Date(min)));
        } else if (!min && max) {
            return currentDate.isBefore(moment(new Date(max)));
        } else if (min && max) {
            return (
                currentDate.isBefore(moment(new Date(max))) &&
                currentDate.isAfter(moment(new Date(min)))
            );
        }

        return true;
    };

    return (
        <div className="w-full">
            <div className="border-0 pb-4 border-b-2 border-underlineColor floating-placeholder relative ">
                {/* <input
                    type="text"
                    {...register}
                    id={"DateInputField__" + id}
                    
                    className="outline-none pb-4  w-full cursor-pointer"
                    placeholder=" "
                    onFocus={(e) => {
                        e.target.type = "date";
                    }}
                    onBlur={(e) => {
                        e.target.type = "text";
                    }}
                    min={min}
                    max={max}
                /> */}
                <div className="flex cursor-pointer">
                    <DateTime
                        className="w-full"
                        inputProps={{
                            readOnly: true,
                        }}
                        initialViewDate={showViewDate()}
                        value={dateValue}
                        onChange={changeDateValue}
                        timeFormat={false}
                        dateFormat="YYYY-MM-DD"
                        isValidDate={validDates}
                    />
                </div>

                <label
                    htmlFor={"DateInputField__" + id}
                    className={` absolute bottom-[15px] left-16 origin-left text-gray-400 ${
                        isPlaceholderVisilble
                            ? normalPlaceholderState()
                            : floatingPlaceholderState()
                    } pointer-events-none transition-all delay-200 ease-in-out`}
                >
                    {placeholder}{" "}
                </label>
            </div>
            {<p className="text-xs text-red-900 ">{errorMessage}</p>}
        </div>
    );
}

export default DateInputField;
