const Joi = require("joi");

const registerSchema = Joi.object({

    name: Joi.string().min(2).required()
        .messages({
            "string.min" : "Name must be of at least 2 characters.",
            "any.required" : "Name is required.",
            "string.empty" : "Name mustnot be empty."
        }),

    email: Joi.string().email().required()
        .messages({
            "string.email" : "Please enter a valid email Address.",
            "any.required" : "Email is required.",
            "string.empty" : "Email mustnot be empty."
        }),

    password: Joi.string().required()
        .min(6).max(16)
        .pattern([/A-Z/],"uppercase letters")
        .pattern([/a-z/],"lowercase letters")
        .pattern([/0-9/],"numbers")
        .pattern([/!@#$%^&*/],"speial characters")
        .messages({
            "string.min" : "Password must be at least {#limit} characters.",
            "string.max" : "Password must be at less than {#limit} characters.",
            "string.pattern.name" : "Password must contain at least one {#name}.",
            "any.required" : "Password is required.",
            "string.empty" : "Password mustnot be empty."
        }),

    confirmPassword: Joi.string()
        .valid(ref("password"))
        .required()
        .messages({
            "any.only" : "Password and Confirm Password doesnot match.",
            "any.required" : "Confirm Password is required",
            "string.empty" : "Confirm Password mustnot be empty."
        }),
});

module.exports = {
    registerSchema
}