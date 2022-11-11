require('dotenv').config()
const sgMail= require('@sendgrid/mail')


// Conecta a SendGrid.
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = async (user) =>{
    try{
        await sgMail.send({
            to: `${user.email}`,
            from: "info.hectormartindama@gmail.com",
            subject: "Cuenta creada con exito.",
            text: `Hola ${user.username}, tu cuenta en Cream Kicks ha sido creada con exito!!!.`
        })
        console.log('Email sent successfully!')

    }catch (error){
        console.log(error)
        if(error.response){
            console.log(error.response.body)
        }
    }
}



/* {
    to: "hectormartindama@gmail.com",
    from: "info.hectormartindama@gmail.com",
    subject: "Correo enviado desde nodeJS",
    text: "Gracias por confiar en nosotros.!!!",
} */


exports.sendWelcomeEmail = (user) => sendWelcomeEmail(user)
