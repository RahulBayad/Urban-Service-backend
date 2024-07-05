
const generateOTP = ()=>{
	let str = '0123456789'
	let otp = ''
	for(let i=0;i<6;i++){
		let index = Math.floor(Math.random()*str.length)
		otp += str[index]
	}
	return otp
}

module.exports = {generateOTP}