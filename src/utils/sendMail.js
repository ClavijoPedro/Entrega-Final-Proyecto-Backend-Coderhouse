import nodemailer, {  createTransport } from "nodemailer";
import config from "../config/config.js";
import logger from './logger.js'

//*==================================[NOTA]======================================*//
//DESACTIVAR ANTIVIRUS PORQUE PUEDE BLOQUEAR LA CONEXION

const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
});


const sendMail = async (options) => {
    try{
        const info = await transporter.sendMail(options)
        logger.info(info)
    }catch(error){logger.error(error)}
}

export default sendMail