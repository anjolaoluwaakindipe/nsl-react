import Joi from "joi";

export const personalDetailsFormSchema = Joi.object({
    fullname: Joi.string().required().trim().min(3),
    emailAddress: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.required(),
    dateOfBirth: Joi.string().isoDate().required(),
    maritalStatus: Joi.required(),
    cscsNumber: Joi.string().required(),
    residentialAddress: Joi.string().required(),
    picture: Joi.required(),
    proofOfIdentification: Joi.required(),
    proofOfResidence: Joi.required(),
    salarySlips: Joi.required(),
});
