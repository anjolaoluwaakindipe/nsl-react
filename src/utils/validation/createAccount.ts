import Joi from "joi";

// import {  onlyNumberReg } from "../constants/inputValidationPatterns";

export const createAccountSchema = Joi.object({
    // cscsAccountNumber: Joi.string()
    //     .required()
    //     .pattern(onlyNumberReg)
    //     .label("CSCS Account Number")
    //     .messages({
    //         "string.pattern.base": "Must contain only numbers",
    //     }),
    fullName: Joi.string().trim().min(2).max(255).label("Full Name"),
    emailAddress: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .label("Email Address"),
    phoneNumber: Joi.string().required().label("Phone Number"),
    // bvn: Joi.string()
    //     .required()
    //     .pattern(onlyNumberReg)
    //     .messages({
    //         "string.pattern.base": "Must contain only numbers",
    //     })
    //     .max(11)
    //     .min(11)
    //     .label("BVN"),
    password: Joi.string().required().alphanum().label("Password"),
});
