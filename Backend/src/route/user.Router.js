import express from 'express';
import { Signup, VerifyOTP, Login, Profile, Logout } from '../controller/user.controller.js';
import { signupValidator, verifyOtpValidator, LoginValidator } from '../validators/auth.validator.js';
import validate from '../middleware/validate.js';
import authMiddleware from '../middleware/auth.middleware.js';




const router = express.Router();


router.post('/Signup', signupValidator, validate, Signup)

router.post('/verify-otp', verifyOtpValidator, validate, VerifyOTP)

router.post('/Login', LoginValidator, validate, Login)

router.get('/Profile', authMiddleware, Profile)

router.post('/Logout', Logout)


export default router;
































