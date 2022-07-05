import logger from '../utils/logger.js';


const getInitial = (req,res) => {
    res.render('index', {title:'home'})
};

const getLogin = (req, res) => {
    res.render('login', {title:'login'})
}

const getRegister = (req, res) => {
    res.render('register', {title:'singUp'})
}

const uploads = async (req,res) => {
    try{
        const user = await req.user;
        
        if(user){
            res.redirect(`/uploads/${user.avatar}`)            
        }else{
            res.send('Imagen no disponible')
        }
    }catch(error){logger.error(error)}
}


const logOut = async (req,res) => {
    try{
        const {name} = await req.user
        req.logout();
        res.render('logout', {name:name, title:'logOut'});
    }catch(error){logger.error(error)}
};


const loginError = (req,res) => {
    res.render('login_error', {title:'login_error'})
};


const signupError = (req, res) => {
    res.render('register_error', {title:'SingUp_error'})
};


const get404 = (req, res) => {
    res.render('404', {title:'404'})
}

export default {
    getInitial,
    getLogin,
    getRegister,
    uploads,
    logOut,
    signupError,
    loginError,
    get404
}
