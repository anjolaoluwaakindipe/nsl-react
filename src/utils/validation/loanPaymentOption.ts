import Joi from "joi";
import { LoanApplicationValidationErrors } from "../../typings";

export function transferFormValidation(
    values: Record<string, any>
): LoanApplicationValidationErrors {
    const validationError: Record<string, any> = {
        accountNumber: Joi.string()
            .required()
            .max(10)
            .min(10)
            .label("Account Number")
            .validate(values.accountNumber).error?.message,
        accountBank: Joi.string()
            .required()
            .label("Account Bank")
            .validate(values.accountBank?.trim()).error?.message,
        accountName: Joi.string()
            .required()
            .min(2)
            .max(255)
            .label("Account Name")
            .validate(values.accountName?.trim()).error?.message,
    };

    Object.keys(validationError).forEach((key) => {
        if (validationError[key] === undefined) {
            delete validationError[key];
        }
    });

    return validationError;
}

export const bankCardValidation = Joi.object({
    amount: Joi.string().required().min(4).label("Amount").messages({
        "string.min": "{{label}} must be greater than N1,000",
    }),
});
