// import { TOTP } from "totp-generator"
const TOTP = require("totp-generator");

const generateOTP = async ()=>{
	const {otp}  = await TOTP.TOTP.generate("JBSWY3DPEHPK3PXP", {
		digits: 6,
		algorithm: "SHA-512",
		period: 120,
	})
	return otp;
}

module.exports = {generateOTP}