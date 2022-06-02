import Joi from "joi";

export const personalDetailsFormSchema = Joi.object({
    fullname: Joi.string().required().trim().min(3).label("Fullname"),
    emailAddress: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email Address"),
    phoneNumber: Joi.string().required().label("Phone Number"),
    gender: Joi.object({
        label: Joi.string().required(),
        value: Joi.string().required(),
    }).required().label("Gender"),
    dateOfBirth: Joi.string().isoDate().required().label("Date of Birth"),
    maritalStatus: Joi.required().label("Marital Status"),
    cscsNumber: Joi.string().required().label("CSCS Number"),
    residentialAddress: Joi.string().required().label("Residential Address"),
    picture: Joi.required().label("Picture"),
    proofOfIdentification: Joi.required().label("Proof of Identification"),
    proofOfResidence: Joi.required().label("Proof of Residence"),
    salarySlips: Joi.required().label("Salary Slips"),
});
