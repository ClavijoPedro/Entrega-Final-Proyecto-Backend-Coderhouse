import express from 'express';
import config from './config/config.js';
import logger from './utils/logger.js'; 
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';

//ROUTER
import serverInfoRouter from './routers/serverInfoRouter.js';
import productosRouter from './routers/productosRouter.js';
import carritoRouter from './routers/carritoRouter.js';
import adminRouter from './routers/adminRouter.js'
import userRouter from './routers/userRouter.js'

//ERRORS
import { errorHandler, notMatchHandler } from './middlewares/errorsHandler.js';

//PASSPORT
import './auth/passport.js'

const app = express();


//JSON, URL y archivos estaticos  
app.use(express.static(path.join(process.cwd(),'/public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//TEMPLATES
app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), 'public/views'));


//SESSION
app.use(cookieParser());
app.use(session(config.EXPRESS_SESSION));


//PASSPORT
app.use(passport.initialize());
app.use(passport.session());


//ROUTER 
app.use('/', userRouter);
app.use('/api/productos', productosRouter);
app.use('/api/productos', adminRouter);
app.use('/api/carrito',  carritoRouter);
app.use('/info', serverInfoRouter);


//ERRORS
app.use(notMatchHandler);
app.use(errorHandler)


//SERVER
const server = app.listen(config.PORT, ()=>{
    logger.info(`SERVER RUNNING - PORT:${config.PORT}`)
});
server.on('error', (error) => logger.error(error));


