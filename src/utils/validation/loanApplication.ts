import Joi from "joi";

export const loanApplicationFormSchema = Joi.object({
    amount: Joi.string()
        .required()
        .min(4)
        .label("Amount")
        .messages({
            "string.min": "{{label}} must be greater than N1,000",
        })
      ,
    tenor: Joi.object({
        label: Joi.string().required().label("Tenor"),
        value: Joi.string()
            .required()
            .label("Tenor")
            .messages({ "string.empty": "Please select a {{#label}}" }),
    })
        .required()
        .label("Tenor"),

    interest: Joi.string().required().label("Interest"),
    purpose: Joi.string().min(10).max(255).label("Narration"),
    termsAndCondition: Joi.boolean().truthy().required(),
    picture: Joi.string().label("Your Picture"),
    repaymentAmount: Joi.string().required().label("Repayment Amount"),
    repaymentDate: Joi.string().required().label("Repayment Date"),
});
