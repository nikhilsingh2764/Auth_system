import { z } from "zod";


export const signupSchema = z.object({


    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters"),

    email: z
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password cannot exceed 50 characters")

});