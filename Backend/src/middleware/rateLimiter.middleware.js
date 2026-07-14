import rateLimit from "express-rate-limit";

// General API limiter
export const apiLimiter = rateLimit({

    // Time window
    windowMs: 15 * 60 * 1000, // 15 minutes

    // Maximum requests
    max: 100,

    message: {
        success: false,
        message: "Too many requests, please try again later"
    },

    standardHeaders: true,
    legacyHeaders: false

});


// Strict limiter for authentication routes
export const authLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 5,

    message: {
        success: false,
        message: "Too many attempts, try again after 15 minutes"
    },

    standardHeaders: true,
    legacyHeaders: false

});


//Rate limiting controls how many requests a user can send within a specific time.









