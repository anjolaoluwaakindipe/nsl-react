import Joi from "joi";
import { onlyNumberReg } from "../constants/inputValidationPatterns";

export const personalDetailsFormSchema = Joi.object({
    title: Joi.string().required().trim().min(2).label("Title"),
    firstName: Joi.string().required().trim().min(3).label("First Name"),
    lastName: Joi.string().required().trim().min(3).label("Last Name"),
    middleName: Joi.string().optional().trim().label("Middle Name"),
    emailAddress: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email Address"),
    phoneNumber: Joi.string().required().label("Phone Number"),
    gender: Joi.object({
        label: Joi.string().required(),
        value: Joi.string().required(),
    })
        .required()
        .label("Gender"),
    dateOfBirth: Joi.string().isoDate().required().label("Date of Birth"),
    maritalStatus: Joi.required().label("Marital Status"),
    cscsNumber: Joi.string().required().label("CSCS Number"),
    residentialAddress: Joi.string().required().label("Residential Address"),
    picture: Joi.string().required().label("Picture"),
    proofOfIdentification: Joi.string()
        .required()
        .label("Proof of Identification"),
    documentType: Joi.object({
        label: Joi.string().required(),
        value: Joi.string().required(),
    })
        .required()
        .label("Document Type"),

    proofOfResidence: Joi.string().required().label("Proof of Residence"),
    salarySlips: Joi.string().optional().label("Salary Slips"),
    bvn: Joi.string()
        .required()
        .pattern(onlyNumberReg)
        .messages({
            "string.pattern.base": "Must contain only numbers",
        })
        .max(11)
        .min(11)
        .label("BVN"),
    IdexpiryDate: Joi.string().isoDate().required().label("Expiry Date"),
    IdissueDate: Joi.string().isoDate().required().label("Issue Date"),
    documentRefNumber: Joi.string()
        .required()
        .label("Document Reference Number"),
});

export const employmentDetailsFormSchema = Joi.object({
    jobTitle: Joi.string().required().label("Job Title"),
    companyName: Joi.string().min(2).required().label("Company Name"),
    natureOfBusiness: Joi.string()
        .min(2)
        .required()
        .label("Nature of Business"),
    companyPhoneNumber: Joi.string().required().label("Company Phone Number"),
    companyEmailAddress: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Company Email Address"),
    grossIncome: Joi.string().required().label("Gross Income"),
    companyAddress: Joi.string().required().label("Company Address"),
});
