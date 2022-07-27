import Joi from "joi";

export const loginSchema = Joi.object({
    usernameOrEmail: Joi.string().required().label("Username or Email"),
    password: Joi.string().required().label("Password"),
});
