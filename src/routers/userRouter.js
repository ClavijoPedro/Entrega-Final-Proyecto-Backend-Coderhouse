import { Router } from "express";
import userController from '../controllers/userController.js'
import passport from 'passport'
import upload from "../utils/multerUpload.js";


const userRouter = new Router()


userRouter.get('/', userController.getInitial)

userRouter.get('/login', userController.getLogin)

userRouter.post('/login', passport.authenticate('login',{
    failWithError:true,
}), userController.getToken);

userRouter.post('/register', upload, passport.authenticate('signup',{
    failWithError:true,
}), userController.getToken);

userRouter.get('/register', userController.getRegister)

userRouter.get('/uploads', userController.getUpload)

userRouter.get('/logout', userController.logOut);

userRouter.get('/login_error', userController.loginError);

userRouter.get('/signup_error', userController.signupError);

export default userRouter