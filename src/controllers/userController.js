import {createAuthToken} from '../auth/jwt.js';
import logger from '../utils/logger.js';


const getInitial = (req,res) => {
    res.render('index.ejs', {title:'home'})
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
        const {name} = await req?.user || '';
        req.logout();
        res.json({message:'Log-out Successful', user:`${name}`});
    }catch(error){logger.error(error)}
};


export default {
    getInitial,
    getUpload,
    logOut,
    getToken
}
