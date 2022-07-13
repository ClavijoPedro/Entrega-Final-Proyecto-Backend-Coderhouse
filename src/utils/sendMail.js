import nodemailer from "nodemailer";
import config from "../config/config.js";
import logger from './logger.js'

//*==================================[NOTA]======================================*//
//DESACTIVAR ANTIVIRUS PORQUE PUEDE BLOQUEAR LA CONEXION

const transporter = nodemailer.createTransport(config.NODEMAILER_TRANSPORT);

export const sendSignupMail = async (newUser) => {
    const options = {
        from: 'Servidor Node.js',
        to: config.EMAIL_ADMIN,
        subject: 'Nuevo registro',
        html: 
            `<h3>Nuevo usuario Registrado</h3><br>
                <ul style='list-style:none;' >
                    <li><b>Nombre:</b> ${newUser.name}</li>
                    <li><b>Email:</b> ${newUser.email}</li>
                    <li><b>Dirección:</b> ${newUser.address}</li>
                    <li><b>Teléfono:</b> ${newUser.phone}</li>
                </ul>`
            ,
    };
    try{
        const info = await transporter.sendMail(options)
        logger.info(info)
    }catch(error){logger.error(error)}
};


export const sendOrderMail = async (name, email, products) => {
    const options = {
        from: 'Servidor Node.js',
        to: config.EMAIL_ADMIN, //cambiar a email del user
        subject: `Nuevo pedido ${name} ${email}`, 
        html: `
            <h3>Nuevo pedido de [${email}]:</h3>
            <br>
            <ul>
                ${products.map(p => `<li>Producto: ${p.name} - Código:${p.code} - Precio:$${p.price} - cantidad:${p.qty}</li>`)}
            </ul>
        `
    };
    try{
        const info = await transporter.sendMail(options)
        logger.info(info)
    }catch(error){logger.error(error)}
};

