import  dotenv from 'dotenv'
// import path from 'path';

dotenv.config()

//*==================================[NOTA]======================================*//

//PARA FUNCIONALIDAD DE ENVIO DE MAILS Y WHTASAPP DESACTIVAR EVENTUALMENTE EL ANTIVIRUS

//*==================================[]======================================*//

export default{
    EXPRESS_SESSION: {
        secret:process.env.PRIVATE__KEY,
        saveUninitialized: false,
        rolling:true,
        resave: true,
        cookie: {
            maxAge: parseInt(process.env.SESSION__TIME) || 86400000 
        }
    },
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_TYPE:process.env.DB__TYPE,
    MONGO_URI: process.env.MONGO_DB_URI,
    MONGO_OPTIONS:{ useNewUrlParser: true, useUnifiedTopology: true },
    PORT: process.env.PORT || 8080,
    HOST: process.env.HOST || "127.0.0.1",
    PRIVATE_KEY: process.env.PRIVATE__KEY,
   
    ADMIN_AUTH_USER: process.env.ADMIN__AUTH_USER,
    ADMIN_AUTH_PASS: process.env.ADMIN__AUTH_PASS,
   
    EMAIL_ADMIN: process.env.EMAIL__ADMIN,
    EMAIL_PASS: process.env.EMAIL__PASS,

    NODEMAILER_TRANSPORT:{
        service:'gmail',
        port: 587,
        auth: {
            user: process.env.EMAIL__ADMIN,
            pass: process.env.EMAIL__PASS
        }
    }, 
}
