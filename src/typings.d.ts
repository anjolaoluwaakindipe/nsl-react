import { HTMLInputTypeAttribute } from "react"

/* Props */

// TextFields
// Single TexField
interface SingleTextFieldProps{
    id?:string
    name?:string
    type?:HTMLInputTypeAttribute
    placeholder?:string
    label?:string
    onChange?:React.ChangeEventHandler<HTMLInputElement>
    value?:string
}


/* Validation Error Types */
// Loan Application
interface LoanApplicationValidationErrors {
    amount?: string;
    tenor?: string;
    intrest?: string;
    narration?: string;
}
