import Joi from "joi";

export const adminSignupSchema = Joi.object({
    firstName: Joi.string().min(4).max(50).required(),
    lastName: Joi.string().min(4).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

export const adminSigninSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});