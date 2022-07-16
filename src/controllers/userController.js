import {createAuthToken} from '../auth/jwt.js';
import logger from '../utils/logger.js';


const getInitial = (req,res) => {
    res.render('index.ejs', {title:'home'})
};


const getLogin = (req, res) => {
    res.render('login.ejs', {title:'login'})
};


const getRegister = (req, res) => {
    res.render('register.ejs', {title:'singUp'})
};


const getToken = async (req, res) => {
    try {
        const user = await req.user;
        const token = createAuthToken({email:user.email, name: user.name})
        res.header("auth_token", token).json({
            message:'Login Successful',
            token
        })
    } catch (error) {
        logger.error(error)
    }
}
const getUpload = async (req, res) => {
    try {
        const user = await req.user;
        if(user){
            return res.redirect(`/uploads/${user.avatar}`)
        }
        res.send({message:'Imagen no disponible', user:false})
    } catch (error) {
        logger.error(error)
    }
}


const logOut = async (req,res) => {
    try{
        const {name} = await req.user || '';
        req.logout();
        res.render('logout.ejs', {name:name, title:'logOut'});
    }catch(error){logger.error(error)}
};


const loginError = (req,res) => {
    res.render('login_error.ejs', {title:'login_error'})
};


const signupError = (req, res) => {
    res.render('register_error.ejs', {title:'SingUp_error'})
};


export default {
    getInitial,
    getLogin,
    getRegister,
    uploads,
    getUpload,
    logOut,
    signupError,
    loginError,
    getToken
}
