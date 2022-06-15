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
    firstName: Joi.string().trim().min(2).max(255).label("Full Name"),
    lastName: Joi.string().trim().min(2).max(255).label("Full Name"),
    emailAddress: Joi.string()
        .required()
        .trim()
        .email({ tlds: { allow: false } })
        .label("Email Address"),
    phoneNumber: Joi.string().trim().required().label("Phone Number"),
    // bvn: Joi.string()
    //     .required()
    //     .pattern(onlyNumberReg)
    //     .messages({
    //         "string.pattern.base": "Must contain only numbers",
    //     })
    //     .max(11)
    //     .min(11)
    //     .label("BVN"),
    password: Joi.string().trim().min(8).required().label("Password"),
    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .label("Confirm Password")
        .messages({ "any.only": "{{#label}} does not match Password" }),
});
