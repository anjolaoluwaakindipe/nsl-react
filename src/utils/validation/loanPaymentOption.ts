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

export function bankCardValidation(
    values: Record<string, any>
): LoanApplicationValidationErrors {
    const validationError: Record<string, any> = {
        amount: Joi.number()
            .required()
            .greater(1)
            .label("Amount")
            .validate(values.amount).error?.message,
        cardNumber: Joi.string()
            .required()
            .label("Card Number")
            .validate(values.cardNumber?.trim()).error?.message,
        cvv: Joi.string()
            .required()
            .min(3)
            .max(3)

            .label("CVV")
            .validate(values.cvv?.trim()).error?.message,

        cardName: Joi.string()
            .required()
            .min(2)
            .max(255)
            .label("Card Name")
            .validate(values.cardName?.trim()).error?.message,
    };

    Object.keys(validationError).forEach((key) => {
        if (validationError[key] === undefined) {
            delete validationError[key];
        }
    });

    return validationError;
}
