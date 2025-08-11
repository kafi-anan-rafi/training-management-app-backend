import Joi from "joi";

export const trainerSignupSchema = Joi.object({
    firstName: Joi.string().min(4).max(50).required(),
    lastName: Joi.string().min(4).max(50),
    designation: Joi.string().min(4).max(200).required(),
    email: Joi.string().email().required(),
    workplace: Joi.string().required(),
    phone: Joi.string().required()
        .pattern(/^(?:\+88|88)?01[3-9]\d{8}$/)
        .message("Enter a valid BD phone number!"),
    password: Joi.string().min(4).required()
});

export const trainerSigninSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});