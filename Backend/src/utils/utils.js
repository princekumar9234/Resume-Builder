export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp) {
  return `
    <h2>Your OTP</h2>
    <p>Your one-time password is: <strong>${otp}</strong></p>
    <p>Please use this code to complete your verification.</p>
`
}
