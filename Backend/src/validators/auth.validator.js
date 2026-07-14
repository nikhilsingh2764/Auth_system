import { body } from "express-validator";

export const signupValidator = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 Character')
        .matches(/^[A-Za-z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores"),

    body("email")
        .trim()
        .normalizeEmail()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage(
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
        )



]

export const verifyOtpValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")  //isEmail check email format
        .normalizeEmail(), // Convert email to standard format

    body("otp")
        .trim()
        .notEmpty().withMessage("OTP is required")
        .isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits")
        .isNumeric().withMessage("OTP must contain only numbers") //isNumeric only allow number



]


export const LoginValidator = [

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")  //isEmail check email format
        .normalizeEmail(), // Convert email to standard format

    
    body("password")
        .notEmpty()
        .notEmpty().withMessage("Password is required")
        .withMessage(
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
        )

]

