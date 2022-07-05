import { Router } from "express";
import userControl from '../controllers/userController.js'
import passport from 'passport'
import upload from "../utils/multerUpload.js";
import isAdmin from "../middlewares/isAdmin.js";


const userRouter = new Router()

userRouter.get('/', userControl.getInitial)

userRouter.get('/login', userControl.getLogin)

userRouter.post('/login', passport.authenticate('login', 
    {
        failureRedirect: '/login_error',
        successRedirect:'/api/productos'
    }
));

userRouter.get('/register', userControl.getRegister)

userRouter.post('/register', upload, passport.authenticate('signup', 
    {
        failureRedirect:'/signup_error',
        successRedirect:'/api/productos'
    }
));


userRouter.get('/uploads', userControl.uploads)

userRouter.get('/logout', userControl.logOut);

userRouter.get('/login_error', userControl.loginError);

userRouter.get('/signup_error', userControl.signupError);



export default userRouter