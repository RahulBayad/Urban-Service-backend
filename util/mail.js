const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false, 
    service : "gmail",
    auth: {
      user: "rahulmb0508@gmail.com",
      pass: process.env.MAILER_PASS,
    },
});

const sendEmail = async (receiverMailAddress, mailOptions, OTP) =>{
    try {
        console.log("email address" , receiverMailAddress, "and otp is ",OTP)
        const mail = await transporter.sendMail(mailOptions)
    
        return mail;
    } catch (error) {
        console.log("Error during sending mail",error)
    }

}


module.exports = {sendEmail}
