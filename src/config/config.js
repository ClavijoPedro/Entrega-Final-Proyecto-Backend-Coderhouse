import  dotenv from 'dotenv'
dotenv.config()
// dotenv.config({
//     path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
// });
//*==================================[NOTA]======================================*//

//PARA FUNCIONALIDAD DE ENVIO DE MAILS Y WHTASAPP DESACTIVAR EVENTUALMENTE EL ANTIVIRUS
//HABILITAR SANDBOX TWILIO PARA REALIZAR LAS PRUEBAS DE WHATSAPP (DURA SOLO 24HS)
//PARA ENVIO DE SMS LOCAL QUITAR EL 9 DEL NUMERO DE TEL, PARA WHATSAPP AGREGARLO ES INT.
/*
    EJ. FORMATO TEL INT : +5491155550000
    EJ. FORMATO TEL LOCAL : +541155550000
*/

//*==================================[]======================================*//

export default{
    EXPRESS_SESSION: {
        secret:process.env.PRIVATE__KEY,
        saveUninitialized: false,
        rolling:true,
        resave: true,
        cookie: {
            maxAge: 86400000 
        }
    },
    NODE_ENV: process.env.NODE__ENV,
    DB_CLIENT:process.env.DB__CLIENT,
    MONGO_URI: process.env.MONGO_DB_URI,
    PORT: process.env.PORT || 3000,
    MODO : process.argv[2],
    PRIVATE_KEY: process.env.PRIVATE__KEY,
    ADMIN_PASS: process.env.ADMIN__PASS,
    EMAIL_USER: process.env.EMAIL__USER,
    EMAIL_PASS: process.env.EMAIL__PASS,
    TWILIO_SID:process.env.TWILIO__SID,
    TWILIO_TOKEN:process.env.TWILIO__TOKEN,
    TWILIO_TRIAL_NUMBER: process.env.TWILIO_TRIAL_NUMBER, //para SMS
    TWILIO_WHTSP_TRIAL_NUMBER:process.env.TWILIO__WHTSP_TRIAL_NUMBER,

    
    //VARIABLES GLOBALES PARA ENVIO DE EMAIL Y WHATSAP A ADMIN
    ADMIN_EMAIL:process.env.ADMIN__EMAIL,
    ADMIN_PHONE:process.env.ADMIN__PHONE,
}
