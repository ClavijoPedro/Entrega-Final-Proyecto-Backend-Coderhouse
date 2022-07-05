import { Router } from "express";
import userController from '../controllers/userController.js'
import passport from 'passport'
import upload from "../utils/multerUpload.js";
import isAdmin from "../middlewares/isAdmin.js";


const userRouter = new Router()

userRouter.get('/', userController.getInitial)

userRouter.get('/login', userController.getLogin)

userRouter.post('/login', passport.authenticate('login', 
    {
        failureRedirect: '/login_error',
        successRedirect:'/api/productos'
    }
));

userRouter.get('/register', userController.getRegister)

userRouter.post('/register', upload, passport.authenticate('signup', 
    {
        failureRedirect:'/signup_error',
        successRedirect:'/api/productos'
    }
));


userRouter.get('/uploads', userController.uploads)

userRouter.get('/logout', userController.logOut);

userRouter.get('/login_error', userController.loginError);

userRouter.get('/signup_error', userController.signupError);



export default userRouter