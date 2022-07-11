import passport from 'passport'
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import logger from "../utils/logger.js";
import {hashPassword, isValidPassword} from '../utils/encryptPassword.js'
import sendMail from '../utils/sendMail.js';
import config from '../config/config.js';
import { usersDao } from '../daos/daoFactory.js';


//users DB
const users = usersDao;

// const ADMIN__EMAIL = 'clavijopedro.dev@gmail.com';
const ADMIN__EMAIL = config.ADMIN_EMAIL;

//Login
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
        try{      
            let user = await users.getOne({email});
            if (!user) {
                logger.error(`Usuario ${email} no encontrado`);
                return done(null, false, {message:'Usuario no encontrado'});
            }
            if(!isValidPassword(user, password)){
                return done(null, false, {message:'Contraseña invalida'});
            }
            return done(null, user);
        }catch(error){logger.info(error)}
    }
));
    
    
//Register
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
        try{
            let user = await users.getOne({email})

            if(user){
                return done(`El usuario ${email} ya esta registrado`)
            }

            //si no existe encripto la password
            const hashedPassword = hashPassword(password);

            //creo el usuario y traigo y traigo su avatar con req.file de multer
            const newUser = {
                ...req.body,
                phone:req.body.full_phone || req.body.phone,
                password: hashedPassword,
                avatar: req.file.filename,
            };

            //mando mail de nuevo registro al administrador 
            const mailAdminOptions = {
                from: 'Servidor Node.js',
                to: ADMIN__EMAIL,
                subject: 'Nuevo registro',
                html: 
                    `<h3>Nuevo usuario Registrado</h3><br>
                        <ul style='list-style:none;' >
                            <li><b>Nombre:</b> ${newUser.name}</li>
                            <li><b>Email:</b> ${newUser.email}</li>
                            <li><b>Edad:</b> ${newUser.age}</li>
                            <li><b>Dirección:</b> ${newUser.address}</li>
                            <li><b>Teléfono:</b> ${newUser.phone}</li>
                            <li><b>Avatar:</b> ${newUser.avatar}</li>
                        </ul>`
                    ,
            }
            const sendInfoToAdminEmail = sendMail(mailAdminOptions)

            //guardo en mongo
            users.create(newUser)
           
            //guardo newUser en req.user
            return done(null, newUser)

        }catch(error){
            logger.error('passport-register_error',error)
            done(error)}
    }
));


//JWT AUTH - USE JSONWEBTOKEN COMUN PARA GENERAR EL TOKEN EL RUTA LOGIN 
//Y AHORA USO PASSPOR-JWT  PARA VERIFICAR SI ESTA BIEN EL TOKEN
// passport.use(new JwtStrategy({
//     secretOrKey: 'top_secret',
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
// }, async (token, done) => {
//     try {
//         // const user = await users.getById(token.user.id)
//         return done(null, token.user)
//     } catch (e) {
//         done(error)
//     }
// }))


//serialize
passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) =>{
    const user = users.getOne({email});
    done(null, user)
});



export default passport
