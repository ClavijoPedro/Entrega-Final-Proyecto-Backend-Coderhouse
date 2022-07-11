import { Router } from "express";
import userController from '../controllers/userController.js'
import passport from 'passport'
import upload from "../utils/multerUpload.js";


const userRouter = new Router()

userRouter.get('/', userController.getInitial)

userRouter.get('/login', userController.getLogin)

userRouter.post('/login', passport.authenticate('login',{
    failureRedirect: '/login_error',
}), userController.getToken);

userRouter.get('/register', userController.getRegister)

userRouter.post('/register', upload, passport.authenticate('signup',{
    failureRedirect:'/signup_error',
}), userController.getToken);

userRouter.get('/uploads', userController.uploads)

userRouter.get('/logout', userController.logOut);

userRouter.get('/login_error', userController.loginError);

userRouter.get('/signup_error', userController.signupError);

// userRouter.post('/login', async(req, res, next) => {
//     passport.authenticate('login', async (err, user,info) => {
//         console.log('entre a login')
//         try {
//             if(err || !user){
//                 const error = new Error('new Error')
//                 return next(error)
//             }
//             req.login(user, async (err) => {
//                 if(err) return next(err);
//                 const body = {id: user.id, email: user.email}
//                 const token = jwt.sign({user: body}, 'top_secret')
//                 // return res.json({
//                 //         mesage: 'Login Successfull',
//                 //         token
//                 //     })
//                 return res.header('auth_token', token).json({
//                             message: 'Login Successfull',
//                             token
//                         })
                    
//                 })   
//         } catch (error) {
//             logger.error(error)
//         }
//     })(req, res, next); 
// });


// userRouter.post('/login', passport.authenticate('login', 
//     {
//         failureRedirect: '/login_error',
//         successRedirect:'/api/productos'
//     }
// ));

// userRouter.post('/register', upload, passport.authenticate('signup', 
//     {
//         failureRedirect:'/signup_error',
//         successRedirect:'/api/productos'
//     }
// ));


export default userRouter