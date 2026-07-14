import express from 'express';
import { Signup, DeactivateAccount, ForgotPassword, ResetPassword, VerifyOTP, DeleteAccount, Login, Profile, Logout, UpdateProfile, UpdatePassword } from '../controller/user.controller.js';
import { signupValidator, verifyOtpValidator, LoginValidator } from '../validators/auth.validator.js';
import validate from '../middleware/validate.js';
import authMiddleware from '../middleware/auth.middleware.js';




const router = express.Router();


router.post('/Signup', signupValidator, validate, Signup)

router.post('/verify-otp', verifyOtpValidator, validate, VerifyOTP)

router.post('/Login', LoginValidator, validate, Login)

router.get('/Profile', authMiddleware, Profile)

router.post('/Logout', Logout)

router.patch('/Update-Profile', authMiddleware, UpdateProfile)

router.patch('/change-password', authMiddleware, UpdatePassword)

router.patch('/deactivate-account', authMiddleware, DeactivateAccount)

router.delete('/delete-account', authMiddleware, DeleteAccount)

router.post("/forgot-password", ForgotPassword);

router.post("/reset-password", ResetPassword);


export default router;
































