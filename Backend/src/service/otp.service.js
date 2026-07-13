import bcrypt from 'bcrypt';
import otpRepository from '../repository/otp.repository.js';
import generateOTP from '../utils/generateOTP.js';
import sendEmail from './email.service.js';
import otpTemplate from '../templates/otp.template.js';

const SALT_ROUNDS = 10;


const sendOTPService = async ({ username, email, password }) => {


    //Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    //generate 6-digit OPT
    const otp = generateOTP();
    console.log(otp);

    //OPT expires in 10 min
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    //remove all old opt from this email
    await otpRepository.deleteByEmail(email);

    // Save temporary signup data
    await otpRepository.create({
        username,
        email,
        password: hashedPassword,
        otp,
        expiresAt
    })


    //send to client email

    //send email to client using email
    await sendEmail({
        to: email,
        subject: "Verify Your Email",
        html: otpTemplate(username, otp)
    });


}


export default sendOTPService;

//opt+data save in db and opt send to client email next is opt verify





















