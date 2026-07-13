import express from 'express';
import { Signup, VerifyOTP } from '../controller/user.controller.js';
import { signupValidator, verifyOtpValidator } from '../validators/auth.validator.js';
import validate from '../middleware/validate.js';




const router = express.Router();


router.post('/Signup', signupValidator, validate, Signup)

router.post('/verify-otp', verifyOtpValidator, validate, VerifyOTP)





export default router;
































