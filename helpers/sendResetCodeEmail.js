const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.sendResetCodeEmail=async (name,email,code,sub)=>{
const accessToken = await oAuth2Client.getAccessToken();
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken    
    }
})

let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: sub,
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dnr5u3jpb/image/upload/v1667486487/logo_lpnpjj.png" alt="" style="width:30px"><span>Action requied : Activate your account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Your password reset code</span></div><button style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">${code}</button><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Travel Agency allow you to stay in our recent tour info</span></div></div>`,
}
let info = await transporter.sendMail(mailOptions);
return info;
}