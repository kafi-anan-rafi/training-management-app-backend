import Joi from "joi";

export const traineeSignupSchema = Joi.object({
    firstName: Joi.string().min(4).max(50).required(),
    lastName: Joi.string().min(4).max(50),
    designation: Joi.string().min(4).max(200).required(),
    email: Joi.string().email().required(),
    workplace: Joi.string().required(),
    phone: Joi.string()
        .pattern(/^(?:\+88|88)?01[3-9]\d{8}$/)
        .message("Enter a valid BD phone number!"),
    password: Joi.string().min(4).required()
});
