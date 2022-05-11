import { HTMLInputTypeAttribute } from "react"

// Form Information
// Loan Application Form
type LoanApplicationFormInfo =  {
    amount:string;
    tenor:string;
    interest:string;
    narration:string;
    termsAndCondition:boolean;
    passport:FileList
    proofOfIdentification:FileList
    proofOfResidence:FileList
    salarySlips:FileList
}

/* Props */
// TextFields
// Single TexField
type  SingleTextFieldProps = {
    id?:string
    name?:string
    type?:HTMLInputTypeAttribute
    placeholder?:string
    label?:string
    onChange?:React.ChangeEventHandler<HTMLInputElement>
    value?:string
    maxLength?:number
}


/* Validation Error Types */
// Loan Application
type LoanApplicationValidationErrors  = {
    amount?: string;
    tenor?: string;
    intrest?: string;
    narration?: string;
}
