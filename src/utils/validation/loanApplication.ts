import Joi from "joi";

export const loanApplicationFormSchema = Joi.object({
    amount: Joi.string().required().max(7).min(4).label("Amount").messages({"string.min": "{{label}} must be greater than N1,000", "string.max": "{{label}} must be less than N 1,000,000"}),
    tenor: Joi.string().required().label("Tenor"),

    interest: Joi.string().required().label("Interest"),
    narration: Joi.string().alphanum().min(10).max(255).label("Narration"),
});
