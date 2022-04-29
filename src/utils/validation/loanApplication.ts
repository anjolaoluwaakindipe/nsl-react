import Joi from "joi";
import { LoanApplicationValidationErrors } from "../../typings";


export function loanApplicationValidation(values: Record<string, any>):LoanApplicationValidationErrors {
    const validationError: Record<string, any> = {
        amount: Joi.number()
            .required()
            .greater(1)
            .label("Amount")
            .validate(values.amount ).error?.message,
        tenor: Joi.string().required().label("Tenor").validate(values.tenor?.trim())
            .error?.message,
        interest: Joi.string()
            .required()
            .label("Interest")
            .validate(values.interest?.trim()).error?.message,
        narration: Joi.string()
            .alphanum()
            .min(10)
            .max(255)
            .label("Narration")
            .validate(values.narration?.trim()).error?.message,
    };

    Object.keys(validationError).forEach((key)=>{
        if(validationError[key]===undefined){
            delete validationError[key];
        }
    })

    return validationError
}

loanApplicationValidation({
    amount: "",
    interest: "sdfaf",
    narration: "asdf",
});
