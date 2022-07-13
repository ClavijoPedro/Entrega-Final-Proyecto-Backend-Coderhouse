import passport from 'passport'
import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import logger from "../utils/logger.js";
import {hashPassword, isValidPassword} from '../utils/encryptPassword.js'
import {sendSignupMail} from '../utils/sendMail.js';
import UserServices from '../services/UserServices.js';


//users DB
const users = new UserServices();


//Login
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try{      
        let user = await users.getUser({email});
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
            let user = await users.getUser({email})
            if(user){
                return done(`El usuario ${email} ya esta registrado`)
            }
            //create new user hash password && get multer avatar
            const hashedPassword = hashPassword(password);
            const newUser = {
                ...req.body,
                phone:req.body.full_phone || req.body.phone,
                password: hashedPassword,
                avatar: req.file.filename || '',
            };
            console.log(newUser)
            const saveUser = await users.createUser(newUser)
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
    const user = users.getUser({email});
    done(null, user)
});



export default passport
