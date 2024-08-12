const nodemailer = require("nodemailer")
require("dotenv").config()

exports.mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
            secure:true
        })

        let info = transporter.sendMail({
            from:`Go Ride ${process.env.MAIL_USER}`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log("email sent", info.response)
        return info
    }
    catch(error){
        console.log("error in sending mail",error.message)
        return error.message
    }
}
