import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email,emailType, userId})=>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if( emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{verifyToken : hashedToken,verifyTokenExpiry: Date.now() + 3600000})
        }
        else if(emailType === 'FORGOT'){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken : hashedToken,forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
        
        var transport = nodemailer.createTransport({
          host: "us2.smtp.mailhostbox.com",
          port: 587,
          secure:false,
          auth: {
            user: "support@walletclone.in.net",
            pass: process.env.MAIL_PASS
          }
        });
          const mailOptions = {
            from: "support@walletclone.in.net",
            to : email,
            subject: emailType==='VERIFY'?"Verify Your Account": "Reset Your Password",
            html: `<p>Click <a href = ${process.env.DOMAIN}/${emailType==='VERIFY'?"verifyemail":"resetpassword"}?token=${hashedToken}>Here</a> to ${emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Password"} or copy the url given below. <br> ${process.env.DOMAIN}/${emailType==='VERIFY'?"verifyemail":"resetpassword"}?token=${hashedToken} </p>`
          }
          const mailresponse = await transport.sendMail(mailOptions);
          return mailresponse
    } catch (error) {
        throw new Error(error.message)
    }
}
