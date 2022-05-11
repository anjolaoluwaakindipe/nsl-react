import React from "react";
import { SingleTextFieldProps } from "../../../typings";

export default function SingleTextField(props: SingleTextFieldProps) {
    return (
        <div className="border-0 border-b-2  w-full">
            <label htmlFor={props.name}>{props.label}</label>
            <input
            maxLength={props.maxLength}
                type={props.type}
                name={props.name}
                id={props.id}
                className="outline-none pb-4 w-full"
                placeholder={props.placeholder}
                onChange={props.onChange}  
                value={props.value}
            />
        </div>
    );
}
