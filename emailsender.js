import { EMAIL, PASSWORD } from './config.js'
import nodemailer from 'nodemailer'

export async function emailsender ({firstname, lastname, telephone, emailfrom, message}){
    const strSafe = (str) => {
        return str.replace(/[<>{}()]/g, '')
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '465',
        secure: 'false',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    })
     
    async function main() {
        const info = await transporter.sendMail({
            from: strSafe(emailfrom),
            to: EMAIL,
            subject: `Mensaje de: ${strSafe(firstname.toUpperCase())} ${strSafe(lastname.toUpperCase())}`,

            text: `
            Nombre y Apellido: ${strSafe(firstname.toUpperCase())} ${strSafe(lastname.toUpperCase())}, 
            Email: ${strSafe(emailfrom)}, 
            Teléfono: ${strSafe(telephone)}, 
            Mensaje: ${strSafe(message)}
            `,

            html: `
            <html>
            <head>
                <style>
                    p{
                        text-transform: capitalize
                    }
                    .email-class, .message{
                        text-transform: none
                    }
                </style>
            </head>
            <body> 
                <div>
                    <p><strong>Nombre: </strong>${strSafe(firstname)}</p>
                    <p><strong>Apellido: </strong>${strSafe(lastname)}</p>
                    <p><strong>Teléfono </strong>${strSafe(telephone.toString())}</p>
                    <p class="email-class"><strong>Email: </strong>${strSafe(emailfrom)}</p>
                    <p><strong>Mensaje: </strong></p>
                    <p class="message">${strSafe(message)}</p>
                </div>
            </body>
            </html>
            `,
    
        })    
        console.log('Message sent: %s', info.messageId)        
    }
    
    return main()
    .then(()=>{
        return true
    })
    .catch(()=>{
        console.error
        return false
    })
    
}